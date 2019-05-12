
var taskList = document.getElementById('task-list')
var request = new XMLHttpRequest()
request.open('GET','http://localhost:3000/api/taskList')
request.send()
request.onload = function() {
    data = JSON.parse(request.responseText)
    loadAvailableTasks(data)
}

function loadAvailableTasks(data) {
    for( let i = 0 ; i < data.length ; i++) {
        if(data[i].checked === false) {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="disabledButton(event)"/>' + data[i].taskName + '</label>'
            item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
            item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
            taskList.append(item)
        }
        else {
            var item = document.createElement('li')
            item.innerHTML += '<label><input type="checkbox" onclick="disabledButton(event)" checked/><strike>'+ data[i].taskName  +'</strike></label>'
            taskList.append(item)
        }
    }
}

function deleteItem(event) { // CHức năng delete
    var item = event.currentTarget.parentElement  // Task đang delete
    if( document.getElementById('save-edit').style.display == 'block') {    // Nếu có task đang edit, thì phải báo hiệu edit trước rồi ms delete
        alert.popWarning("Please input somthing")
    }
    else {
        item.innerHTML = item.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>', '') // Bỏ nút edit
        item.innerHTML = item.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>', '')  // Bỏ nút delete
        item.innerHTML += '<button class="no-button" onclick="deleteFake(event)">No</button>'  // Xuất hiện nút No
        item.innerHTML += '<button class="yes-button" onclick="deleteForever(event)">Yes</button>' // Xuất hiên nút yes
    }
}
function deleteFake(event) { // Nhấn nút delete No
    var item = event.currentTarget.parentElement
    event.currentTarget.remove()  /// Xoá nút button No
    item.innerHTML = item.innerHTML.replace('<button class="yes-button" onclick="deleteForever(event)">Yes</button>','') // Xoá nút delete Yes
    item.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'  //Thêm nút delete
    item.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'    // Thêm nút Edit
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
    listAnimation(currentIndex)
}

function requestDelete (currentIndex) {
    let reqDelete = new XMLHttpRequest()
    reqDelete.open('POST','http://localhost:3000/delete') 
    reqDelete.send(toString(currentIndex))
    reqDelete.onload = function() {
        listAnimation(currentIndex)
    }
    reqDelete.onerror = function() {
        alert('No internet connection')
    }
}

function listAnimation(currentIndex) {
    let tasks = taskList.querySelectorAll('li')
    setTimeout(() => {
        for( let i = 0 ; i < tasks.length ; i++) {
            if( i > currentIndex ) {
                tasks[i].className = 'movingUp'
            }
        }
        for( let i = 0 ; i < tasks.length ; i++) {
            if( i > currentIndex ) {
                tasks[i].removeAttribute('class')
            }
        }
    }, 1000);
    setTimeout(() => {
        tasks[currentIndex].remove()     
    }, 1000);
    setTimeout(() => {
        tasks[currentIndex].className = 'fadeOut'          
    }, 1000);
}
// **********************************************************************************************************
function changeColorUndone() {
    var listTask = document.getElementById('task-list')
    var count = 0
    countUndone2 = 0
    for (count; count < listTask.childElementCount; count++) {
        checkDifferentDeleteUndone(count, listTask)   
    }
}
function changeColorDone() {
    var listTask = document.getElementById('task-list')
    var count = 0
    countDone2 = 0
    for (count; count < listTask.childElementCount; count++) {
        checkDifferentDeleteDone(count, listTask)
    }
}
function checkDifferentDeleteDone(count, item) {
    if (counting2 != count) {
        checkPosition(count, item, counting2)
        checkDone(count, item)
    }
}
function checkDifferentDeleteUndone(count, item) {
    if (counting != count) {
        checkPosition(count, item, counting)
        checkUndone(item, count)
    }
}
function checkUndone(item, count) {
    if (item.childNodes[count].childNodes[0].childNodes[0].checked == false) {
        countUndone2++
        changeBackgroundColor(item.childNodes[count], countUndone2)
    }
}
function checkDone(count, item) {
    if (item.childNodes[count].childNodes[0].childNodes[0].checked == true ) { 
        countDone2++
        changeBackgroundColor(item.childNodes[count], countDone2) 
    }
}
function checkDisplay(objectDisplay, item) {   
    if (item.innerHTML == document.getElementById('task-list').childNodes[document.getElementById('save').value].innerHTML) {  // Check xem task delete có đang vừa bị edit 
        objectDisplay.style.display = 'block'
        document.getElementById('save-edit').style.display = 'none'
        document.getElementById('header-taskname-edit').value = ''
    }
    else {
        countTask--
        countUndone--
        item.innerHTML = item.innerHTML.replace('check','')
        item.innerHTML += 'delete'
        var taskList = document.getElementById('task-list')
        checkSave(item, taskList)
    }
}
function checkSave(item, taskList) {
    var i = 0
    while (item.innerHTML != taskList.childNodes[i].innerHTML) {
        i++
    }
    if (i < document.getElementById('save').value) {
        document.getElementById('save').value--
    }
}


//save
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
        alert.popSuccess("Edit successfully!!")
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

function validateEdit() {
    var checkValidate = document.getElementById('header-taskname-edit')
    if (checkValidate.value.trim() == '') {
        document.getElementById('valid-edit').style.display = 'block'
        alert.popWarning("Please input somthing")
    }
}

function deleteAttentionEdit() {
    var checkBorder = document.getElementById('header-taskname-edit')
    if (document.getElementById('valid-edit').style.display == 'block') {
        document.getElementById('valid-edit').style.display = 'none'
        checkBorder.style.border = "default"
    }
}

function editTaskName(event) {
    if (document.getElementById('header').style.display == 'none') {
        alert.popWarning("Please edit before change")
    }
    else {
        var item = event.currentTarget.parentElement
        var item1 = event.currentTarget.parentElement.innerHTML
        var transit = document.getElementById('header-taskname-edit')
        var saveIndex = document.getElementById('save')
        transit.value = item.childNodes[0].innerText
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

function disabledButton(event) {
    var check = event.currentTarget.parentElement
    var check3 = event.currentTarget.parentElement.parentElement
    var checkParent = check.parentElement
    if (checkParent.innerHTML.includes('checked="true"') == true) {
        checkParent.innerHTML += 'check'
        stringCheck = checkParent.innerHTML
        counting2 = 0
        findPosition(stringCheck, listTask)
        checkParent.innerHTML = checkParent.innerHTML.replace('>check', '>')
        countUndone++
        countDone--
        checkParent.innerHTML = checkParent.innerHTML.replace('checked="true"', '')
        checkParent.innerHTML += '<button class="delete-button" onclick="deleteItem(event)">Delete</button>'
        checkParent.innerHTML += '<button class="edit-button" onclick="editTaskName(event)">Edit</button>'
        checkParent.childNodes[0].style.textDecoration = 'none'
        statisticCounter()
    }
    else {
        checkSaveDisplay(checkParent, check, check3, listTask)
    }
}
function findPosition(stringCheck, item) {
    while (stringCheck != item.childNodes[counting2].innerHTML)
    {  
        counting2++
    }
}
function findPosition2(stringCheck, item) {
    while (stringCheck != item.childNodes[counting].innerHTML)
    {  
        counting++
    }
}
function animationDisable(checkParent, listTask, check3) {
    if (done == 1) {
        var count = 0
        checkParent.setAttribute('class', 'gradient-color')
        setTimeout(function () {
            changeColorDone()
            setTimeout(function() {
                checkParent.style.display = 'none'
                for (count; count < listTask.childElementCount; count++) {
                    listTask.childNodes[count].removeAttribute('class')
                }
            }, 1000)
        }, 1000)
    }
    else {
        check3.classList.add('gradient1-color')
        setTimeout(function() { 
            check3.removeAttribute('class')
        }, 1000)
    }
}
function checkSaveDisplay(checkParent, check, check3, listTask) {
    var onsave = document.getElementById('header')
    if (onsave.style.display == 'none') {
        document.getElementById('valid-edit').style.display = 'block'
        alert.popWarning("Please edit before change")
        check.childNodes[0].checked = false
    }
    else {
        countDone++
        countUndone--
        checkParent.innerHTML = checkParent.innerHTML.replace('(event)"', '(event)" checked="true"')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="yes-button" onclick="deleteForever(event)">Yes</button>', '')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="no-button" onclick="deleteFake(event)">No</button>', '')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="edit-button" onclick="editTaskName(event)">Edit</button>', '')
        checkParent.innerHTML = checkParent.innerHTML.replace('<button class="delete-button" onclick="deleteItem(event)">Delete</button>', '')
        checkParent.childNodes[0].style.textDecoration = 'line-through'
        checkTaskOrUndone(checkParent, check3, listTask)
    }
    statisticCounter()
}
function checkTaskOrUndone(checkParent, check3, listTask) {
    if (undone == 1) {
        checkParent.innerHTML+= 'check'
        stringCheck = checkParent.innerHTML
        counting = 0
        findPosition2(stringCheck, listTask)
        checkParent.innerHTML = checkParent.innerHTML.replace('>check', '>')
        checkParent.setAttribute('class', 'gradient-color')
        setTimeout(function () {
            changeColorUndone()
            setTimeout(function() {
                checkParent.style.display = 'none'
                recoverList(listTask)
            }, 1000)
        }, 1000)
    }
    else {
        check3.classList.add('gradient1-color')   
        setTimeout(function() {
            check3.removeAttribute('class')
        }, 1000)
    }
}
function dropDown() {
    document.getElementById("dropdown-list").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.drop-button')) {
        dropdownShow()
    }
}

function dropdownShow() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i = 0;
    for (i; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        openDropdownShow(openDropdown);
    }
}

function openDropdownShow(openDropdown) {
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
}
var buttonText = document.getElementsByClassName('drop-button')

function allShow() {
    done = 0
    task = 1
    undone = 0
    var count = 0
    var listTask = document.getElementById('task-list')
    for (count; count < listTask.childElementCount; count++) {
        listTask.childNodes[count].style.display = 'block'
        listTask.childNodes[count].style.opacity = 1
    }
    buttonText[0].innerText = 'All'
}

function doneShow() {
    var onsave = document.getElementById('header')
    if (onsave.style.display == 'none') {
        document.getElementById('valid-edit').style.display = 'block'
        alert.popWarning("Please edit before change")   
    }
    else {
        var count = 0
        var listTask = document.getElementById('task-list')
        done = 1
        task = 0
        undone = 0
        countDone2 = 0
        for (count; count < listTask.childElementCount; count++) {
            setOrderListDone(listTask, count)
        }  
        buttonText[0].innerText = 'Done'
    }
}
function setOrderListDone(listTask, count) {
    if (listTask.childNodes[count].childNodes[0].childNodes[0].checked == true ) {
        countDone2++
        listTask.childNodes[count].style.display = 'block' 
    }
    else
        displayNone(listTask.childNodes[count])  
}
function undoneShow() {
    var listTask = document.getElementById('task-list')
    var count = 0
    done = 0
    task = 0
    undone = 1
    countUndone2 = 0
    for (count; count < listTask.childElementCount; count++) {
        setOrderListUndone(listTask, count)    
    }
    buttonText[0].innerText = 'Undone'
}
function setOrderListUndone(listTask, count) {
    if (listTask.childNodes[count].childNodes[0].childNodes[0].checked == false) {
        countUndone2++
        listTask.childNodes[count].style.display = 'block' 
    }
    else
        displayNone(listTask.childNodes[count])
}
function displayNone(item) {
    item.style.display = 'none'
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
function statisticCounter() {
    var doneCounter = countDone
    var undoneCounter = countUndone
    doneRatio = Math.round((doneCounter/(doneCounter+undoneCounter))*100)
    undoneRatio = Math.round((undoneCounter/(doneCounter+undoneCounter))*100)
    animateValue("done-task-percentage", initialDone, doneRatio, 500, "Done: ")
    animateValue("undone-task-percentage", initialUndone, undoneRatio, 500, "Undone: ")
    initialDone = doneRatio
    initialUndone = undoneRatio
}

var video = document.querySelector('.videoplayer')
var progress = document.querySelector('.timeline-progress')
var playOrPauseBtn = document.getElementById('play-pause')
var volumeBtn = document.getElementById('mute-unmute')
var timeline = document.getElementById('timeline')
video.muted = true


function playOrPause() {
    if(video.paused) {
        playOrPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
        video.play();
    }
    else {
        playOrPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
        video.pause();
    }
}


video.addEventListener('timeupdate', function() {
    var timeposition = video.currentTime/video.duration;
    progress.style.width = timeposition * 100 + "%";
    if (video.ended) {
        playOrPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
})

video.addEventListener('click',function() {
    playOrPause();
})

function timeChooser() {
    var chosenTime = event.offsetX / timeline.offsetWidth * video.duration
    video.currentTime = chosenTime
}


function muteOrUnmute() {
    if (video.muted) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
        video.muted = false
    }
    else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
        video.muted = true
    }
}
function screenCustomize() {
    var fullscreen = video.webkitRequestFullscreen || video.mozRequestFullScreen || video.msRequestFullscreen;
    fullscreen.call(video);
}
video.addEventListener('volumechange',function(e){
    if (this.muted) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
    else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
    }
}, false)

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