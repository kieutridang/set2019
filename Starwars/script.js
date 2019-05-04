var nextPeopleBtn = document.getElementById('next-people-page')
var previousPeopleBtn = document.getElementById('previous-people-page')
function requestPeople() {
   let peopleRequest = new XMLHttpRequest()
   peopleRequest.open('GET','https://swapi.co/api/people/')
   peopleRequest.onload = function() {
     let peopleData = JSON.parse(peopleRequest.responseText)
     displayPeople(peopleData)
   }
   peopleRequest.onerror = function() {
     alert('No internet connection')
   }
   peopleRequest.send()
}

function displayPeople(peopleData) {
  document.getElementById('body').innerHTML += "there are totally " + peopleData.count + " characters"
  let list = document.getElementById("item-container")
  list.innerHTML=""
   for(let i = 0; i < peopleData.results.length; i++) {
      let detailsInfo = "'" + peopleData.results[i].url +"'"
      list.innerHTML += '<button id="characters" onclick="detailsRequest('+ detailsInfo +')">'+ peopleData.results[i].name + '</button>' + '</br>'
      list.innerHTML +="<div id='details'></div>"
   }
   let nextPage = "'" + peopleData.next + "'"
   list.innerHTML += '<button id="next-people-page" onclick="pagesRequest(' + nextPage +')">Next</button>'
}

requestPeople();


function requestPlanets(callback) {

}

function requestFilms(callback) {

}

function requestSpecies(callback) {

}

function requestVehicles(callback) {

}

function requestStarShips(callback) {

}

function pagesRequest(url) {
  let request = new XMLHttpRequest()
  request.open('GET',url)
  request.onload = function() {
    let data = JSON.parse(request.responseText)
    displayPagesData(data)
  }
  request.onerror = function() {
    alert('No internet connection')
  }
  request.send()
}

function displayPagesData(data) {
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < data.results.length; i++) {
    let detailsInfo = "'" + data.results[i].url +"'"
    list.innerHTML += '<button id="characters" onclick="detailsRequest('+ detailsInfo +')">'+ data.results[i].name + '</button>' + '</br>'
    list.innerHTML +="<div id='details'></div>"
  }
  let nextPage = "'" + data.next + "'"
  let previousPage = "'" + data.previous + "'"
  if(data.previous !== null) {
    list.innerHTML += '<button id="previous-people-page" onclick="pagesRequest(' + previousPage +')">previous</button>'
  }
  if(data.next !== null) {
    list.innerHTML += '<button id="next-people-page" onclick="pagesRequest(' + nextPage +')">Next</button>'
  }
}

function detailsRequest(url) {

}


