var http = require('http')
var fs = require('fs')
const url = require('url')
const port = 3000
const hostname = '127.0.0.1'
var check = 0
var user = []
var specialChar = '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'
var singleChar = "'"

function collectDataFromPost(request, callback) {
    let body = ''
    request.on('data', chunk => {
        body += chunk.toString()
    })
    request.on('end', () => {
        callback(JSON.parse(body))
    })
}

var server = http.createServer(function(req, res) {
    var reqUrl = url.parse(req.url, true)
    if (reqUrl.pathname == '/' || reqUrl.pathname == '/log-in') {
        check = 0
        fs.readFile('log-in.html', function (err, html) {
            if (err) {
                throw err; 
            }
            var content = html
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(content)
            res.end();  
        })
    }
    else if (reqUrl.pathname == '/sign-up') {
        check = 0
        fs.readFile('sign-up.html', function (err, html) {
            if (err) {
                throw err; 
            }
            var content = html
            res.writeHead(200, {"Content-Type": "text/html"});  
            res.write(content)
            res.end();  
        })
    }
    else if (reqUrl.pathname == '/home') {
        if (check == 0) {
            res.writeHead(302, { Location : "http://localhost:3000/log-in"})
            res.end();  
            
        }
        else {
            fs.readFile('home.html', function (err, html) {
                if (err) {
                    throw err; 
                }
                var content = html
                res.writeHead(200, {"Content-Type": "text/html"});  
                res.write(content)
                res.end();  
            })
        }
    }
    else if (reqUrl.pathname == '/script.js') {
        res.writeHead(200);
        var script = fs.readFileSync("script.js", "utf8");
        res.write(script);
        res.end();     
    }
    else if (reqUrl.pathname == '/style.css') {
        res.writeHead(200);
        var style = fs.readFileSync("style.css", "utf8");
        res.write(style);
        res.end();  
    }
    else if (reqUrl.pathname == '/check') {
       collectDataFromPost(req, result => {
           var email = result.email
           var password = result.password
           var detect = true
           for ( var count = 0; count < user.length; count++) {
               var emailCheck = user[count].email
               var passwordCheck = user[count].password
                if ((email == emailCheck) && (password == passwordCheck) && (password!= '') && (email != '')) {
                        detect = false
                        check = 1
                        res.statusCode = 200
                        res.setHeader('Content-type','application/json')
                        res.write('true')
                        res.end();
                }
            }
           if (detect == true) {
                res.statusCode = 200
                res.setHeader('Content-type','application/json')
                res.write('false')
                res.end();
           }
       }) 
    }
    else if (reqUrl.pathname == '/register') {
        collectDataFromPost(req, result => {
            var email = result.email
            var password = result.password
            if (checkRegister(email,password)) {
                 check = 1
                 var obj = {}
                 obj.email = email
                 obj.password = password
                 user.push(obj)
                 res.statusCode = 200
                 res.setHeader('Content-type','application/json')
                 res.write('true')
                 res.end();
            }
            else {
                 res.statusCode = 200
                 res.setHeader('Content-type','application/json')
                 res.write('false')
                 res.end();
            }
        }) 
     }
    else if (reqUrl.pathname == '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
    }
    else {
        res.writeHeader(404, {"Content-Type": "application/json"});  
        res.write('Page Not Found');  
        res.end();     
    }
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

function checkRegister(email, password) {
    if (!checkLength(password)) {
        return false
    }
    if (!checkLower(password)) {
        return false
    }
    if (!checkNumber(password)) {
        return false
    }
    if (!checkSpace(password)) {
        return false
    }
    if (!checkUpper(password)) {
        return false
    }
    if (!checkSpecialChar(password)) {
        return false
    }
    if (!checkEmail(email)) {
        return false
    }
    return true
}

function checkEmailForm (countAtMark, countPeriod, atMarkIndex, periodIndex, email) {
    if (countAtMark != 1 || countPeriod != 1) {
        return false
    }
    if (atMarkIndex == 0 || atMarkIndex == email.length - 1) {
        return false
    }
    if (periodIndex == 0 || periodIndex == email.length - 1) {
        return false
    }
    if (atMarkIndex > periodIndex) {
        return false
    }
    if (atMarkIndex == periodIndex - 1) {
        return false
    }
    return true
}

function checkEmail (email) {
    var countAtMark = 0
    var countPeriod = 0
    var atMarkIndex = -1
    var periodIndex = -1

    for (var i = 0; i < email.length; i++) {
        if (email[i] == '@') {
            countAtMark = countAtMark + 1
            atMarkIndex = i
        }
        if (email[i] == '.') {
            countPeriod = countPeriod + 1
            periodIndex = i
        }
    }

    if (!checkEmailForm(countAtMark, countPeriod, atMarkIndex, periodIndex, email)) {
        return false
    }

    for (var i = 0; i < atMarkIndex; i++) {
        if (!isNumber(email[i]) && !isAlphabet(email[i])) {
            return false
        }
    }

    for (var i = atMarkIndex + 1; i < email.length; i++) {
        if (i != periodIndex && !isAlphabet(email[i])) {
            return false
        }
    }

    return true
}

function isNumber (char) {
    if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
        return true
    }    
    return false
}

function isAlphabet (char) {
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
        return true
    }
    if (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) {
        return true
    }
    return false
}

function checkSpecialChar (password) {
    for (var j = 0; j < password.length; j++) {
        for (var i = 0; i < specialChar.length; i++) {
            if (specialChar[i] == password[j]) {
                return true
            }
        }
        if (singleChar == password[j]) {
            return true;
        }
    }
    return false
}

function checkLength(password) {
    if (password.length >= 8)
        return true
    else
        return false
}
function checkNumber(password) {
    for ( var count = 0; count < password.length; count++) {
        if (password[count].charCodeAt(0) >= 48 && password[count].charCodeAt(0)  <= 57) {
            return true
        }
    }
    return false
}
function checkUpper(password) {
    for ( var count = 0; count < password.length; count++) {
        if (password[count].charCodeAt(0)  >= 65 && password[count].charCodeAt(0)  <= 90) {
            return true
        }
    }
    return false
}
function checkLower(password) {
    for ( var count = 0; count < password.length; count++) {
        if (password[count].charCodeAt(0)  >= 97 && password[count].charCodeAt(0)  <=  122) {
            return true
        }
    }
    return false
}
function checkSpace(password) {
    for ( var count = 0; count < password.length; count++) {
        if (password[count].charCodeAt(0)  == ' ') {
            return false
        }
    }
    return true
}