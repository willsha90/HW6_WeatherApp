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
        addCity(data.name);  
        return displayWeather(data)
      } else {
        return displayForecast(data)
      }
    });
}


function displayWeather(data) {
  console.log('in displayWeather');
  console.log(data);
  cityTemp.innerHTML = data.main.temp;
  cityWind.innerHTML = data.wind.speed;
  cityHumidity.innerHTML = data.main.humidity;
  // cityUV.innerHTML = "z"
  const {lat,lon}=data.coord;
  fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myAPIId}`)
  .then(res => res.json())
  .then(data=>{
    console.log(data);
  const uvi = data.current.uvi;
  var severity;
  if (uvi<3)severity="low";
  else if (uvi<6)severity="moderate";
  else if (uvi<8)severity="high";
  else if (uvi<11)severity="veryhigh";
  else severity="extreme";
  cityUV.innerHTML=`<span class="${severity}">${uvi}</span>`
  });
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
  getCityWeatherData(myCity, 'weather');
  getCityWeatherData(myCity, 'forecast');
  // getCityWeatherData(myCity, 'forecast')
}

function handleSavedCityClick(e){
const myCity = e.target.textContent;
getCityWeatherData(myCity, 'weather');
getCityWeatherData(myCity, 'forecast');
}

// local storage 
function getCities(){
  const cities=localStorage.getItem("cities");
  if(cities){return JSON.parse(cities)
  }
}

function addCity(city){
  var cities = getCities();
  // if cities do not exist, cities return as empty
  if (!cities) cities=[];
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify (cities));
}

//*****ON PAGE LOAD  *************

//need to check to see if anything is in local storage and populate user city
btnSubmit.addEventListener("click", handleClick)

const cities = getCities()
if (cities){
for (let city of cities){
  const btn= document.createElement("button");
  btn.textContent=city;
  document.querySelector("#savedCities").append(btn);
  btn.addEventListener("click", handleSavedCityClick);
}
}