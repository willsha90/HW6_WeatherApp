// javascript.js
console.log('Aloha')

// **** GLOBAL DECLARATIONS*********
const baseURI = 'http://api.openweathermap.org/data/2.5/';
const myAPIId = 'dbf5f0cf87ab9e0799c0fb6cd0b54ea4';
const btnSubmit = document.querySelector('.btn-user-city');
const userCity = document.querySelector('#city-search');
const cityTemp = document.querySelector('#cityTemp');
const cityWind = document.querySelector('#cityWind');
const cityHumidity = document.querySelector('#cityHumidity');
const cityUV = document.querySelector('#cityUV');

// **** FUNCTION DEFINITIONS*********
function getCityWeatherData(myCity, myForecastType) {
  var myFetchString = baseURI + myForecastType + '?q=' + myCity + '&appid=' + myAPIId + "&units=imperial";

  // fetch('http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=dbf5f0cf87ab9e0799c0fb6cd0b54ea4')
  //        http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  fetch(myFetchString)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      if (myForecastType==="weather") {
        return displayWeather(data)
      } else {
        return displayForecast(data)
      }
    });
}

function displayWeather(data) {
  console.log('in displayWeather');
  console.log(data);
  cityTemp.innerHTML = data.main.temp
  cityWind.innerHTML = data.wind.speed
  cityHumidity.innerHTML = data.main.humidity
  cityUV.innerHTML = "z"
}

function displayForecast(data) {
  console.log('in displayForecast');
  console.log(data);
  // cityForecastTemp
  const forecastCards = document.getElementsByClassName("forecastCard");
  console.log(forecastCards);
  for (let i = 0; i < forecastCards.length; i++) {
    var weatherCard = `<li>Temp: ${data.list[i].main.temp}</li><li>Wind: ${data.list[i].wind.speed}</li><li>Temp: ${data.list[i].main.humidity}</li>`
    // 
    forecastCards[i].innerHTML = weatherCard
    //forecastCards.append(this.forecastCards[i])
  }
}

function handleClick(e) {
  var myCity = userCity.value
  getCityWeatherData(myCity, 'weather')
  getCityWeatherData(myCity, 'forecast')
  // getCityWeatherData(myCity, 'forecast')
}


//*****ON PAGE LOAD  *************

//need to check to see if anything is in local storage and populate user city
btnSubmit.addEventListener("click", handleClick)