// javascript.js
console.log('Aloha')

// **** GLOBAL DECLARATIONS*********
const baseURI = 'http://api.openweathermap.org/data/2.5/';
const myAPIId = 'dbf5f0cf87ab9e0799c0fb6cd0b54ea4';
const btnSubmit = document.querySelector('.btn-user-city');
const userCity = document.querySelector('#city-search');


// **** FUNCTION DEFINITIONS*********
function getCityWeatherData(myCity, myForecastType) {
  var myFetchString = baseURI + myForecastType + '?q=' + myCity + '&appid=' + myAPIId;

  
  // fetch('http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=dbf5f0cf87ab9e0799c0fb6cd0b54ea4')
  
 fetch(myFetchString)
    .then(function(response)  {return response.json()})
    .then(function(data)  {return data});
}

function displayData() {
console.log('in displayData');
}


function handleClick(e) {
  var myCity = userCity.value
  var myCityData = getCityWeatherData(myCity, 'weather')
  console.log(myCityData);
  
  displayData()
  // getCityWeatherData(myCity, 'forecast')
  
}


//*****ON PAGE LOAD  *************

btnSubmit.addEventListener("click", handleClick)