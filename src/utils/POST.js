const getRequest = function(url) {
    return new Promise((resolve,reject) => {
        var get = new XMLHttpRequest()
        get.open('POST', url)
        get.send()
        get.onload = function() {
            let data = JSON.parse(get.responseText)
            resolve(data)
        }
        get.onerror = function() {
            reject('post failed')
        }
    })
}

module.exports = getRequest