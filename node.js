var http = require('http')
var fs = require('fs')

http.createServer((req,res) => {
    console.log(req.url)
    if(req.url == '/' ) {
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
}).listen(3000)

console.log('Sever is now running on http://localhost:3000')