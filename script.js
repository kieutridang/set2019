currentPage = ''
var taskList = document.getElementById('task-list')
var request = new XMLHttpRequest()
var initialUndone = 0
var initialDone = 0
var oldName
//khi mới load trang thì tạo request để load những task đã được lưu trên server
request.open('GET','http://localhost:3000/api/taskList')
request.send()
request.onload = function() {
    data = JSON.parse(request.responseText)
    loadAvailableTasks(data)
    
}

request.onerror = function() {
    alert.popError('failed')
}


function loadAvailableTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
        if(data[i].checked === false) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()"/>' + data[i].taskName + '</label>'
            item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
            item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
            taskList.append(item)
        }
        else {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()" checked/><strike>'+ data[i].taskName  +'</strike></label>'
            taskList.append(item)
        }
    }
    getStatistic()
}

function loadUndoneTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
        if(data[i].checked === false) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()"/>' + data[i].taskName + '</label>'
            item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
            item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
            taskList.append(item)
        }
    }
    getStatistic()
}

function loadDoneTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
       if(data[i].checked === true) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="checkTask()" checked/><strike>'+ data[i].taskName  +'</strike></label>'
            taskList.append(item)
        }
    }
    getStatistic()
}

function deleteItem(event) { 
    var item = event.currentTarget.parentElement  
    if( document.getElementById('save-edit').style.display == 'block') {  
        alert.popWarning("Please input somthing")
    }
    else {
        item.innerHTML = item.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>', '') 
        item.innerHTML = item.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>', '')  
        item.innerHTML += '<button class="no-button" onclick="deleteFake(event)">No</button>' 
        item.innerHTML += '<button class="yes-button" onclick="deleteForever(event)">Yes</button>' 
    }
}

function deleteFake(event) { 
    var item = event.currentTarget.parentElement
    event.currentTarget.remove()  
    item.innerHTML = item.innerHTML.replace('<button class="yes-button" onclick="deleteForever(event)">Yes</button>','') 
    item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
    item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'   
} 

function deleteForever(event) {
    let tasks = taskList.querySelectorAll('li')
    let currentTask = event.currentTarget.parentElement
    currentTask.innerHTML += '*'
    for( let i = 0 ; i < tasks.length ; i++) {
        if(tasks[i].innerHTML === currentTask.innerHTML) {
            tasks[i].innerHTML = tasks[i].innerHTML.replace('*', '')
            var currentIndex = i
        }
    }
    requestDelete (currentIndex)
}

function requestDelete (currentIndex) {
    let reqDelete = new XMLHttpRequest()
    reqDelete.open('POST','http://localhost:3000/delete') 
    reqDelete.send('' + currentIndex)
    reqDelete.onload = function() {
        deleteAnimation(currentIndex)
        alert.popSuccess('Delete successfully!')
    }
    reqDelete.onerror = function() {
        alert.popError('failed')
    }
}

function deleteAnimation(currentIndex) {
    let tasks = taskList.querySelectorAll('li')
    setTimeout(() => {
        for( let i = 0 ; i < tasks.length ; i++) {
            if( i > currentIndex ) {
                tasks[i].className = 'movingUp'
            }
        }
    }, 0);
    setTimeout(() => {
        tasks[currentIndex].remove() 
        for( let i = 0 ; i < tasks.length ; i++) {
            if( i > currentIndex ) {
                tasks[i].removeAttribute('class')
            }
        }    
        getStatistic()
    }, 1000);
    setTimeout(() => {
        tasks[currentIndex].className = 'fadeOut'
    }, 0);
}

function checkTask() {
    let taskCheckBoxs = taskList.querySelectorAll('input')
    let checkedTasks = []
    for( let i = 0 ; i < taskCheckBoxs.length ; i++) {
        if(taskCheckBoxs[i].checked === true) {
            checkedTasks.push(i)
        }
    }
    requestCheck(checkedTasks)
}

function requestCheck(checkedTasks) {
    let reqCheck= new XMLHttpRequest()
    reqCheck.open('POST','http://localhost:3000/checkTask') 
    reqCheck.send(JSON.stringify(checkedTasks))
    reqCheck.onload = function() {
        data = JSON.parse(reqCheck.responseText)
        taskList.innerHTML =""
        loadAvailableTasks(data)
        alert.popSuccess('Check successfully!')
    }
    reqCheck.onerror = function() {
        alert.popError('failed')
    }
}
function animateValue(id, start, end, duration, type) {
    var obj = document.getElementById(id);
    var range = end - start;
    var stepTime = Math.abs(Math.floor(duration / range));
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;
    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = type + value + "%";
        if (value == end) {
            clearInterval(timer);
        }
    }
    timer = setInterval(run, stepTime);
    run();
}
function getStatistic(){
    let numberOfTasks = taskList.childElementCount
    let doneRate = 0
    let undoneRate = 0

    for(var i = 0; i < numberOfTasks; i++){
        {
            let task = taskList.childNodes[i].childNodes[0].childNodes[0] 
            if (task.checked) {
                doneRate++
            } else {
                undoneRate++
            }
        }   
    }
    if (numberOfTasks != 0) {
        doneRate = Math.round((doneRate/(numberOfTasks))*100)
        undoneRate = Math.round((undoneRate/(numberOfTasks))*100)
        animateValue("done-task-percentage", initialDone, doneRate, 500, "Done: ")
        animateValue("undone-task-percentage", initialUndone, undoneRate, 500, "Undone: ")
        initialDone = doneRate
        initialUndone = undoneRate
    }
        // Thêm vào phần animation vào, có thể dùng cái cũ của Nguyên
}

function dropDown() {
    document.getElementById("dropdown-list").classList.toggle("show");
}

function allShow() {
    currentPage = 'all'
    let reqAll = new XMLHttpRequest()
    reqAll.open('GET','http://localhost:3000/all')
    reqAll.send()
    reqAll.onload = function() {
        taskList.innerHTML = ""
        data = JSON.parse(reqAll.responseText)
        loadAvailableTasks(data)
    }
    reqAll.onerror = function() {
        alert.popError('failed')
    }
}

function doneShow() {
    currentPage = 'done'
    let reqDone = new XMLHttpRequest()
    reqDone.open('GET','http://localhost:3000/done')
    reqDone.send()
    reqDone.onload = function() {
        taskList.innerHTML = ""
        data = JSON.parse(reqDone.responseText)
        loadAvailableTasks(data)
    }
    reqDone.onerror = function() {
        alert.popError('failed')
    }
}

function undoneShow() {
    currentPage = 'undone'
    let reqUndone = new XMLHttpRequest()
    reqUndone.open('GET','http://localhost:3000/undone')
    reqUndone.send()
    reqUndone.onload = function() {
        taskList.innerHTML = ""
        data = JSON.parse(reqUndone.responseText)
        loadAvailableTasks(data)
    }
    reqUndone.onerror = function() {
        alert.popError('failed')
    }
}

function editTaskName(event) {
    if (document.getElementById('header').style.display == 'none') {
        alert.popWarning("Please edit before change")
    }
    else {
        var item = event.currentTarget.parentElement
        var transit = document.getElementById('header-taskname-edit')
        var saveIndex = document.getElementById('save')
        transit.value = item.childNodes[0].innerText
        oldName = transit.value
        var item2 = event.currentTarget
        item2.innerHTML += 'hello'
        document.getElementById('header').style.display = 'none'
        document.getElementById('save-edit').style.display = 'block'
        item2.innerHTML = item2.innerHTML.replace('hello', '')
        saveIndex.value = findIndex(item)
    }
}

function findIndex(item) {
    var taskList = document.getElementById('task-list') 
    var i = 0
    while (taskList.childNodes[i].innerHTML != item.innerHTML) {
        i++
    }
    return i
}

function saveTask() {
    var checkValidate = document.getElementById('header-taskname-edit')
    if (checkValidate.value.trim() != '') {
        var saveIndex = document.getElementById('save')
        var taskList = document.getElementById('task-list')
        var liSave = taskList.childNodes[saveIndex.value]
        var nodeFirst = liSave.childNodes[0]     
        var nodeSecond = nodeFirst.childNodes[0]
        checkNode(nodeSecond, liSave, checkValidate.value)
        liSave.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        liSave.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        document.getElementById('header').style.display = 'block'
        document.getElementById('save-edit').style.display = 'none'
        document.getElementById('valid-edit').style.display = 'none'

        var request = new XMLHttpRequest()
        var data = {
            originalName : oldName,
            replaceName  : checkValidate.value
        }
        request.onreadystatechange = function() {
            if (this.readyState == 4) {
                alert.popSuccess("Edit successfully!!")
                console.log(this.response)
            }
        }
        
        request.open('POST','http://localhost:3000/todolistedit')  
        request.send(JSON.stringify(data))
    }
}

function checkNode(node, liSave, checkValidateValue) {
    if (node.checked == true) {
        liSave.innerHTML  = '<label><input type="checkbox" onclick="disabledButton(event)" checked="true">' + checkValidateValue.trim() + '</label>' 
    }
    else {
        liSave.innerHTML  = '<label><input type="checkbox" onclick="disabledButton(event)">' + checkValidateValue.trim() + '</label>'     
    }
}

function deleteAttentionEdit() {
    var checkBorder = document.getElementById('header-taskname-edit')
    if (document.getElementById('valid-edit').style.display == 'block') {
        document.getElementById('valid-edit').style.display = 'none'
        checkBorder.style.border = "default"
    }
}

function deleteAttention() {
    var checkBorder = document.getElementById('header-taskname')
    if (document.getElementById('valid').style.display == 'block') {
        document.getElementById('valid').style.display = 'none'
        checkBorder.style.border = "default"
    }
}

function validateEdit() {
    var checkValidate = document.getElementById('header-taskname-edit')
    if (checkValidate.value.trim() == '') {
        document.getElementById('valid-edit').style.display = 'block'
        alert.popWarning("Please input somthing")
    }
}

// **********************************************************************************************************
//alert class
class Alert {
    constructor (position,timeout,hasDisableClick,isStacked)
    {   
        this.timeout = timeout
        this.isStacked = isStacked
        this.positions = position.split('-')
        this.hasDisableClick = hasDisableClick
    }
   
    popSuccess(str) {
        var div = document.createElement('div')
        div.className = "alert-success"
        div.id = "popUp"
        var currentPosition ='top'
        div.innerHTML += '<i class="fas fa-check-circle"></i>'
        for (var i in this.positions) {
            if (this.positions[i]==='right') {
                div.style.left = "77%"
            }
            if (this.positions[i]==='left') {
                div.style.left = "2%"
            }
            if (this.positions[i]==='center') {
                div.style.left = "40%"
            }
            if (this.positions[i]==='bottom') {
                div.style.top = "73vh"
                currentPosition = 'bottom'
            }
        }
        popsitionModifier.bind(this)(currentPosition);
        if (this.hasDisableClick) {
           div.innerHTML += '<i class="fas fa-times" id="close-button" onclick="disable(event)"></i>'
        }
       
        div.innerHTML+= "<h3>"+ str +"</h3>"
        document.getElementById('pop-up').appendChild(div)
        setTimeout (function() {
            div.style.animationName = "fadeOut" 
        },this.timeout)
        setTimeout (function() {
            div.remove(); 
        },this.timeout + 1000)
    }

   popError(str) {
    var div = document.createElement('div')
    div.className = "alert-error"
    div.id = "popUp"
    var currentPosition ='top'
    div.innerHTML += '<i class="fas fa-times-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='right') {
            div.style.left =  "77%"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2%"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "73vh"
            currentPosition = 'bottom'
        }
    }
    popsitionModifier.bind(this)(currentPosition);
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h3>"+ str +"</h3>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout (function() {
        div.style.animationName = "fadeOut" 
    },this.timeout)
    setTimeout (function() {
        div.remove(); 
    },this.timeout + 1000)
   }

   popInfo(str) {
    var div = document.createElement('div')
    div.className = "alert-info"
    div.id = "popUp"
    var currentPosition ='top'
    div.innerHTML += '<i class="fas fa-info-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='right') {
            div.style.left = "77%"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2%"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "73vh"
            currentPosition = 'bottom'
        }
    }
    popsitionModifier.bind(this)(currentPosition);
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h3>"+ str +"</h3>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout (function() {
        div.style.animationName = "fadeOut" 
    },this.timeout)
    setTimeout (function() {
        div.remove(); 
    },this.timeout + 1000)
   }

   popWarning(str) {
    var div = document.createElement('div')
    div.className = "alert-warning"
    div.id = "popUp"
    var currentPosition ='top'
    div.innerHTML += '<i class="fas fa-exclamation-circle"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='right') {
            div.style.left = "77%"
        }
        if (this.positions[i]==='left') {
            div.style.left = "2%"
        }
        if (this.positions[i]==='center') {
            div.style.left = "40%"
        }
        if (this.positions[i]==='bottom') {
            div.style.top = "73vh"
            currentPosition = 'bottom'
        }
    }
    popsitionModifier.bind(this)(currentPosition);
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"  onclick="disable(event)"></i>'
    }
    div.innerHTML += "<h3>"+ str +"</h3>"
    document.getElementById('pop-up').appendChild(div)
    setTimeout (function() {
        div.style.animationName = "fadeOut" 
    },this.timeout)
    setTimeout (function() {
        div.remove(); 
    },this.timeout + 1000)
    
   }
}

function popsitionModifier(position) {
var pops = document.querySelectorAll("#popUp")
  if(position === 'top') {
    if (this.isStacked) {
        for (var j = pops.length-1; j >= 0; j--) {
            var countNumberOfPops = pops.length - j + 1;
            pops[j].style.top =  (countNumberOfPops-1)*13 + "vh"
            pops[j].style.animation = "moveDown 1s forwards"
        }
    }
    else {
        for (var j = pops.length-1; j >= 0; j--) {
            pops[j].remove(); 
        }
    }
  }
  if(position === 'bottom') {
    if (this.isStacked) {
        for (var j = pops.length-1; j >= 0; j--) {
            var countNumberOfPops = pops.length - j + 1;
            pops[j].style.top =  73 - (countNumberOfPops-1)*13 + "vh"
            pops[j].style.animation = "moveUp 1s forwards"
        }
    }
    else {
        for (var j = pops.length-1; j >= 0; j--) {
            pops[j].remove(); 
        }
    }
  }
}

function disable(event) {
   var ChosenPop = event.currentTarget.parentElement
   ChosenPop.remove();
}

let alert = new Alert('bottom-right',5000,true,false)
