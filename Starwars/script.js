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
  document.getElementById('staticstic').innerHTML = "There are totally " + peopleData.count + " characters"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < peopleData.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + peopleData.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ peopleData.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (peopleData.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + peopleData.next + "'" +')">Next</button>'
  }
}
//test request

function requestPlanets() {
  let planetsRequest = new XMLHttpRequest()
  planetsRequest.open('GET','https://swapi.co/api/planets')
  planetsRequest.send()
  planetsRequest.onload = function() {
    let planetsData = JSON.parse(planetsRequest.responseText)
    displayPlanets(planetsData)
  }
  planetsRequest.onerror = function() {
    alert('No internet connection')
  }
}

function displayPlanets(planetsData) {
  document.getElementById('staticstic').innerHTML = "There are totally " + planetsData.count + " planets"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < planetsData.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + planetsData.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ planetsData.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (planetsData.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + planetsData.next + "'" +')">Next</button>'
  }
}

function requestFilms() {
  let filmsRequest = new XMLHttpRequest()
  filmsRequest.open('GET','https://swapi.co/api/films')
  filmsRequest.onload = function() {
    let filmsData = JSON.parse(filmsRequest.responseText)
    displayFilms(filmsData)
  }
  filmsRequest.onerror = function() {
    alert('No internet connection')
  }
  filmsRequest.send()
}

function displayFilms(filmsData) {
  document.getElementById('staticstic').innerHTML = "There are totally " + filmsData.count + " films"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < filmsData.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + filmsData.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ filmsData.results[i].title + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (filmsData.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + filmsData.next + "'" +')">Next</button>'
  }
}

function requestSpecies() {
  let speciesRequest = new XMLHttpRequest()
  speciesRequest.open('GET','https://swapi.co/api/species')
  speciesRequest.onload = function() {
    let speciesData = JSON.parse(speciesRequest.responseText)
    displaySpecies(speciesData)
  }
  speciesRequest.onerror = function() {
    alert('No internet connection')
  }
  speciesRequest.send()
}

function displaySpecies(speciesData) {
  document.getElementById('staticstic').innerHTML = "There are totally " + speciesData.count + " species"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < speciesData.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + speciesData.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ speciesData.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (speciesData.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + speciesData.next + "'" +')">Next</button>'
  }
}

function requestVehicles() {
  let vehiclesRequest = new XMLHttpRequest()
  vehiclesRequest.open('GET','https://swapi.co/api/vehicles/')
  vehiclesRequest.onload = function() {
    let vehiclesData = JSON.parse(vehiclesRequest.responseText)
    displayVehicles(vehiclesData)
  }
  vehiclesRequest.onerror = function() {
    alert('No internet connection')
  }
  vehiclesRequest.send()
}

function displayVehicles(vehiclesData) {
  document.getElementById('staticstic').innerHTML = "There are totally " + vehiclesData.count + " vehicles"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < vehiclesData.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + vehiclesData.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ vehiclesData.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (vehiclesData.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + vehiclesData.next + "'" +')">Next</button>'
  }
}

function requestStarShips() {
  let starShipsRequest = new XMLHttpRequest()
  starShipsRequest.open('GET','https://swapi.co/api/starships/')
  starShipsRequest.onload = function() {
    let starShipsData = JSON.parse(starShipsRequest.responseText)
    displayStarShips(starShipsData)
  }
  starShipsRequest.onerror = function() {
    alert('No internet connection')
  }
  starShipsRequest.send()
}

function displayStarShips(starShipsData) {
  document.getElementById('staticstic').innerHTML = "There are totally " + starShipsData.count + " starships"
  let list = document.getElementById("item-container")
  list.innerHTML=""
  for(let i = 0; i < starShipsData.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + starShipsData.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ starShipsData.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (starShipsData.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + starShipsData.next + "'" +')">Next</button>'
  }
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
  for (let i = 0; i < data.results.length; i++) {
    list.innerHTML += '<button id="collapsible" onclick="detailsRequest('+ "'" + data.results[i].url +"'" +',event)"> <i class="fas fa-chevron-right"></i> '+ data.results[i].name + '</button>'
    list.innerHTML +="<div id='details'></div>"
  }
  if (data.previous !== null) {
    list.innerHTML += '<button id="previous-page" onclick="pagesRequest(' + "'" + data.previous + "'" +')">previous</button>'
  }
  if(data.next !== null) {
    list.innerHTML += '<button id="next-page" onclick="pagesRequest(' + "'" + data.next + "'" +')">Next</button>'
  }
}

function detailsRequest(url, event) {
  var detailsContent =  event.currentTarget.nextElementSibling
  if (detailsContent.innerHTML !== "") {
    collapseAnimation (detailsContent)
    return
  }
  let request = new XMLHttpRequest()
  request.open('GET',url)
  request.send()
  let currentDetailsBtn = event.currentTarget
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
    else if (data[key].length > 1 && key !== "films" && typeof data[key] ===  "object") {
      detailsContent.innerHTML += "<button id='collapsible'  onclick = 'changeUrlsIntoNames("+ '"' + data[key] + '"' +", event)'> <i class='fas fa-chevron-right'></i> " + "<strong>" + key + "</strong>" + "</button>"
      detailsContent.innerHTML +="<div id='details'></div>"
    } 
    else if (data[key].length > 1 && key === "films" && typeof data[key] ===  "object") {
      detailsContent.innerHTML += "<button id='collapsible' onclick = 'changeUrlsIntoTitles("+ '"' + data[key] + '"' +", event)'> <i class='fas fa-chevron-right'></i> " + "<strong>" + key + "</strong>" + "</button>"
      detailsContent.innerHTML +="<div id='details'></div>"
    }
    else {
      detailsContent.innerHTML += "<p>"+ "<strong>" + key + "</strong>" + ": " + data[key] +"</p>"
    }
  }
  collapseAnimation (detailsContent)
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
  var data = []
  var detailsContent =  event.currentTarget.nextElementSibling
  if (detailsContent.innerHTML !== "") {
    collapseAnimation (detailsContent)
    return
  }
  detailsContent.innerHTML = ""
  for ( let i = 0 ; i < URLs.length ; i++) {
    let request = new XMLHttpRequest()
    request.open('GET', URLs[i])
    request.send() 
    request.onload = function() {
      data.push(JSON.parse(request.responseText))
      if( i === URLs.length - 1 ) {
        displayNames(data,detailsContent)
      }
    }
     request.onerror = function() {
      alert('No internet connection')
    }
  }
}

function displayNames(data, detailsContent) {
  for (let i = 0 ; i < data.length ; i++) {
    detailsContent.innerHTML += "<p>" + data[i].name + "</p>"
  }
  collapseAnimation(detailsContent)
}

function changeUrlsIntoTitles(urls,event) {
  var URLs = urls.split(',')
  var data = []
  var detailsContent =  event.currentTarget.nextElementSibling
  if (detailsContent.innerHTML !== "") {
    collapseAnimation (detailsContent)
    return
  }
  detailsContent.innerHTML = ""
  for ( let i = 0 ; i < URLs.length ; i++) {
    let request = new XMLHttpRequest()
    request.open('GET', URLs[i])
    request.send() 
    request.onload = function() {
      data.push(JSON.parse(request.responseText))
      if( i === URLs.length - 1) {
        displayTitles(data,detailsContent)
      }
    }
     request.onerror = function() {
      alert('No internet connection')
    }
  }
}

function displayTitles(data, detailsContent) {
  for (let i = 0 ; i < data.length ; i++) {
    detailsContent.innerHTML += "<p>" + data[i].title + "</p>"
  }
  collapseAnimation(detailsContent)
}

function collapseAnimation (detailsContent) {
  button = detailsContent.previousElementSibling
  button.classList.toggle('active')
  if (detailsContent.style.maxHeight){
    detailsContent.style.maxHeight = null
  } else {
    detailsContent.style.maxHeight = detailsContent.scrollHeight + "px"
  } 
}
 