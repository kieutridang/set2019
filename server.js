var http = require('http')
var fs = require('fs')

//thử nghiệm nếu có sẵn 4 task như sau
var taskList = [
    {
       taskName : 'do sth 1',
       checked: false
    }, 
    {
        taskName : 'do sth 2',
        checked: false
    }, 
    {
        taskName : 'do sth 3',
        checked: false
    },
    {
        taskName : 'do sth 4',
        checked: true
    }
]

function getResources(req,res) {
    if(req.url == '/' || req.url == '/all' || req.url == '/done' || req.url == '/undone') {
       res.writeHead(200,{'Content-Type':'text/html'})
       fs.createReadStream(__dirname + '/index.html').pipe(res)
    }
    if(req.url ==='/style.css' ) {
        res.writeHead(200,{'Content-Type':'text/css'})
        fs.createReadStream(__dirname + '/style.css').pipe(res)
    }
    if (req.url === '/script.js') {
        res.writeHead(200,{'Content-Type':'text/js'})
        fs.createReadStream(__dirname + '/script.js').pipe(res)
    }
    if(req.url ==='/api/taskList') {
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(taskList))
    }
}

http.createServer((req,res) => {
    getResources(req,res)
    if(req.url === '/delete') {
      req.on('data', result => {     
        currentIndex = JSON.parse(result.toString())
        taskList.splice(currentIndex,1)
        res.end()
      })
    }
    if(req.url === '/checkTask') {
        let index = 0
        req.on('data', result => {     
          let checkedIndexes = JSON.parse(result.toString())
          for(let i = 0 ; i < taskList.length; i++) {
            if(i === checkedIndexes[index]) {
                index++
                taskList[i].checked = true
            }
            else {
                taskList[i].checked = false
            }
          }
          res.writeHead(200,{'Content-Type':'text/plain'})
          res.end(JSON.stringify(taskList))
        })
    }
    if(req.url === '/all') {
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(taskList))
    }
    if(req.url === '/done') {
        let doneTasks = []
        for(let i = 0 ; i < taskList.length; i++) {
            if(taskList[i].checked === true) {
                doneTasks.push(taskList[i])
            }
        }
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(doneTasks))
    }
    if(req.url === '/undone') {
        let undoneTasks = []
        for(let i = 0 ; i < taskList.length; i++) {
            if(taskList[i].checked === false) {
                undoneTasks.push(taskList[i])
            }
        }
        res.writeHead(200,{'Content-Type':'text/plain'})
        res.end(JSON.stringify(undoneTasks))
    }
    debugger
    if(req.url === '/getStatistic') {
        let number = 0
        req.on('data', result => {     
          let checkTaskbox = JSON.parse(result.toString())
          for(let i = 0 ; i < taskList.length; i++) {
            if(i === checkTaskbox[number]) {
                number++
                checkTaskbox.checked = true
            }
            else {
                checkTaskbox.checked = false
            }
          }
          res.writeHead(200,{'Content-Type':'text/plain'})
          res.end(JSON.stringify(getStatistic))
        })
    }
}).listen(3000)

console.log('Sever is now running on http://localhost:3000')