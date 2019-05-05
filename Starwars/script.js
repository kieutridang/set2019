function requestPeople() {
  let peopleRequest = new XMLHttpRequest()
  peopleRequest.open('GET','https://swapi.co/api/people/')
  peopleRequest.send()
  peopleRequest.onload = function() {
    let peopleData = JSON.parse(peopleRequest.responseText)
    displayPeople(peopleData)
  }
  peopleRequest.onerror = function() {
    alert('No internet connection')
  }
}

function displayPeople(peopleData) {
  document.getElementById('body').innerHTML += "there are totally " + peopleData.count + " characters"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < peopleData.results.length; i++) {
    list.innerHTML += '<button id="characters" onclick="detailsRequest('+ "'" + peopleData.results[i].url +"'" +',event)">'+ peopleData.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  list.innerHTML += '<button id="next-people-page" onclick="pagesRequest(' + "'" + peopleData.next + "'" +')">Next</button>'
}
//test request
requestPeople();


function requestPlanets() {

}

function requestFilms() {

}

function requestSpecies() {

}

function requestVehicles() {

}

function requestStarShips() {

}

function pagesRequest(url) {
  let request = new XMLHttpRequest()
  request.open('GET',url)
  request.send()
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    displayPagesData(data)
  }
  request.onerror = function() {
    alert('No internet connection')
  }
}

function displayPagesData(data) {
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < data.results.length; i++) {
    list.innerHTML += '<button id="characters" onclick="detailsRequest('+ "'" + data.results[i].url +"'" +',event)">'+ data.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if(data.previous !== null) {
    list.innerHTML += '<button id="previous-people-page" onclick="pagesRequest(' + "'" + data.previous + "'" +')">previous</button>'
  }
  if(data.next !== null) {
    list.innerHTML += '<button id="next-people-page" onclick="pagesRequest(' + "'" + data.next + "'" +')">Next</button>'
  }
}

function detailsRequest(url, event) {
  let request = new XMLHttpRequest()
  request.open('GET',url)
  request.send()
  currentDetailsBtn = event.currentTarget
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    displayDetails(data,currentDetailsBtn)
  }
  request.onerror = function() {
    alert('No internet connection')
  }
}

function displayDetails(data, currentElement) {
  detailsContent = currentElement.nextElementSibling
  detailsContent.innerHTML=""
  for ( var key in data) {
    if(data[key].length === 0) {
      detailsContent.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": none</p>"
    }
    else if (data[key].length === 1 && key !== "films") {
      changeUrlIntoName(data[key][0], detailsContent, key) 
    }
    else if (data[key].length === 1 && key === "films") {
      changeUrlIntoTitle(data[key][0] , detailsContent, key)
    }
    else if (data[key].indexOf('https') === 0 && typeof data[key] !== "object" && key !== "url") {
      changeUrlIntoName(data[key] , detailsContent, key)
    }
    else if (data[key].length > 1 && key !== "films" && typeof data[key] ===  "object") {
      detailsContent.innerHTML += "<button onclick = 'changeUrlsIntoNames("+ '"' + data[key] + '"' +", event)'>" + "<strong>" + key + "</strong>" + "</button>"
      detailsContent.innerHTML +="<div id='details'></div>"
    } 
    else if (data[key].length > 1 && key === "films" && typeof data[key] ===  "object") {
      detailsContent.innerHTML += "<button onclick = 'changeUrlsIntoTitles("+ '"' + data[key] + '"' +", event)'>" + "<strong>" + key + "</strong>" + "</button>"
      detailsContent.innerHTML +="<div id='details'></div>"
    }
    else {
      detailsContent.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": " + data[key] +"</p>"
    }
  }
}

function changeUrlIntoName(url, content, key) {
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
  request.onload = function() {
  let data = JSON.parse(request.responseText)
    content.innerHTML += "<p>" + "<strong>" + key + "</strong>" + ": " + data.name +"</p>"
  }
  request.onerror = function() {
    alert('No internet connection')
  }
}

function changeUrlIntoTitle(url, content, key) {
  let request = new XMLHttpRequest()
  request.open('GET', url)
  request.send()
  request.onload = function() {
  let data = JSON.parse(request.responseText)
    content.innerHTML += "<p>" + "<strong>" + key + "</strong>" + ": " + data.title +"</p>"
  }
  request.onerror = function() {
    alert('No internet connection')
  }
}

function changeUrlsIntoNames(urls, event) {
  var URLs = urls.split(',')
  var detailsContent =  event.currentTarget.nextElementSibling
  for ( let i = 0 ; i < URLs.length ; i++) {
    let request = new XMLHttpRequest()
    request.open('GET', URLs[i])
    request.send() 
    request.onload = function() {
    let data = JSON.parse(request.responseText)
      detailsContent.innerHTML += "<p>" + data.name +"</p>"
    }
    request.onerror = function() {
      alert('No internet connection')
    }
  }
}

function changeUrlsIntoTitles(urls,event) {
  var URLs = urls.split(',')
  var detailsContent =  event.currentTarget.nextElementSibling
  for ( let i = 0 ; i < URLs.length ; i++) {
    let request = new XMLHttpRequest()
    request.open('GET', URLs[i])
    request.send() 
    request.onload = function() {
    let data = JSON.parse(request.responseText)
      detailsContent.innerHTML+= "<p>" + data.title +"</p>"
    }
    request.onerror = function() {
      alert('No internet connection')
    }
  }
}