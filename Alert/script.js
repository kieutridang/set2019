 class Alert {
    
    constructor (position,timeout,hasDisableClick)
    {   
        this.timeout = timeout
        this.isStacked = false
        this.positions = position.split('-')
        this.hasDisableClick = hasDisableClick
    }
   
   popSuccess() {
    var div = document.createElement('div')
    div.className = "alert-sucess"
    div.innerHTML += '<i class="fas fa-check"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='top') {
            div.style.top = "0"
        }
        if (this.positions[i]==='right') {
            div.style.right = "0"
        }
        if (this.positions[i]==='left') {
            div.style.left = "0"
        }
        if (this.positions[i]==='bottom') {
            div.style.bottom = "0"
        }
        if (this.positions[i]==='middle') {
            div.style.left = "40%"
        }
     }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"></i>'
    }
    div.innerHTML += "<h1>Success!!</h1>"
    document.body.appendChild(div)
    this.isStacked = true
    setTimeout(function() { 
        document.body.removeChild(div)
        this.isStacked = false
    }, this.timeout)
    }

   popError() {
    var div = document.createElement('div')
    div.className = "alert-error"
    div.innerHTML += '<i class="fas fa-check"></i>'
    for (var i in this.positions) {
        if (this.positions[i]==='top') {
            div.style.top = "0"
        }
        if (this.positions[i]==='right') {
            div.style.right = "0"
        }
        if (this.positions[i]==='left') {
            div.style.left = "0"
        }
        if (this.positions[i]==='bottom') {
            div.style.bottom = "0"
        }
        if (this.positions[i]==='middle') {
            div.style.left = "40%"
        }
     }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"></i>'
    }
    div.innerHTML += "<h1>error</h1>"
    body.append(div)
    this.isStacked = true
    setTimeout(function(){ 
        body.remove(div);
        this.isStacked = false
    }, this.timeout)
   }

   popInfo() {
    var div = document.createElement('div')
    div.className = "alert-info"
    div.innerHTML += '<i class="fas fa-check"></i>'
    for (var i in positions) {
        if (positions[i]==='top') {
            div.style.top = "0"
        }
        if (positions[i]==='right') {
            div.style.right = "0"
        }
        if (positions[i]==='left') {
            div.style.left = "0"
        }
        if (positions[i]==='bottom') {
            div.style.bottom = "0"
        }
        if (positions[i]==='middle') {
            div.style.left = "40%"
        }
     }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"></i>'
    }
    div.innerHTML += "<h1>SucCess!!</h1>"
    body.append(div)
    this.isStacked = true
    setTimeout(function(){ 
        body.remove(div);
        this.isStacked = false
    }, this.timeout)
   }

   popWarning() {
    var div = document.createElement('div')
    div.className = "alert-warning"
    div.innerHTML += '<i class="fas fa-check"></i>'
    for (var i in positions) {
        if (positions[i]==='top') {
            div.style.top = "0"
        }
        if (positions[i]==='right') {
            div.style.right = "0"
        }
        if (positions[i]==='left') {
            div.style.left = "0"
        }
        if (positions[i]==='bottom') {
            div.style.bottom = "0"
        }
        if (positions[i]==='middle') {
            div.style.left = "40%"
        }
     }
    if (this.hasDisableClick) {
       div.innerHTML += '<i class="fas fa-times" id="close-button"></i>'
    }
    div.innerHTML += "<h1>SucCess!!</h1>"
    body.append(div)
    this.isStacked = true
    setTimeout(function(){ 
        body.remove(div);
        this.isStacked = false
    }, this.timeout)
   }
};

debugger
// test using Alert class using render error
function renderError() {
    let position = 'top-right'
    let timeout = 3000
    let hasDisableCLick = true;
    let alertError = new Alert(position,timeout,hasDisableCLick)
    alertError.popSuccess();
}
