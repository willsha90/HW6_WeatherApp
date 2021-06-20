// javascript.js
console.log('Aloha')

// **** GLOBAL DECLARATIONS*********
const baseURI = 'https://api.openweathermap.org/data/2.5/';
const myAPIId = 'dbf5f0cf87ab9e0799c0fb6cd0b54ea4';
const userCity = document.querySelector('#city-search');

// **** FUNCTION DEFINITIONS*********
function getCityData(myCity) {
  var myFetchString = baseURI + 'weather?q=' + myCity + '&appid=' + myAPIId + "&units=imperial";

  // fetch('https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=dbf5f0cf87ab9e0799c0fb6cd0b54ea4')
  //        https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}

  fetch(myFetchString)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      addCity(data.name);
      getCityWeather(data.coord,data.name);
    })
    .catch (function (err){
      console.log(err);
    }); 

}

function getCityWeather({lat,lon},city) {
  var myFetchString = `${baseURI}onecall?lat=${lat}&lon=${lon}&appid=${myAPIId}&units=imperial`;
  fetch(myFetchString)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      displayWeather(data,city);
      displayForecast(data);
    })
    .catch (function (err){
      console.log(err);
    });  
}

function displayWeather(data, city) {
  
  console.log(data);
  const date = (new Date(data.current.dt*1000)).toLocaleDateString();
  const temp= data.current.temp;
  const humidity = data.current.humidity;
  const windspeed = data.current.wind_speed;
  const icon = data.current.weather[0].icon;
  const desc = data.current.weather[0].description;
  const uvi = data.current.uvi;
  var severity;
  if (uvi<3)severity="low";
  else if (uvi<6)severity="moderate";
  else if (uvi<8)severity="high";
  else if (uvi<11)severity="veryhigh";
  else severity="extreme";
  document.querySelector("main section:first-of-type").innerHTML=`
    <h4>${date}</h4>
    <h2>${city}</h2>
    <h3>${desc}</h3>
    <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="${desc}">
    <p>temp: ${temp}&deg;F</p>
    <p>humidity: ${humidity}%</p>
    <p>wind speed: ${windspeed}MPH</p>
    <p>UVI: <span class="${severity}">${uvi}</span></p>
  `;
}

function displayForecast(data) {
  let html="<h2>Forecast</h2>";
  for(let i =0;i<5;i++){
    let day=data.daily[i];
    let date=(new Date(day.dt*1000)).toLocaleDateString();
    let temp=day.temp.day;
    let humidity=day.humidity;
    let windspeed=day.wind_speed;
    let icon = day.weather[0].icon;
    let desc = day.weather[0].description;
    html+=`
      <div>
        <h3>${date}</h3>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
        <p>temp: ${temp}&deg;F</p>
        <p>humidity: ${humidity}%</p>
        <p>wind speed: ${windspeed}MPH</p>
      </div>
    `;
  }
  document.querySelector("main section:last-of-type").innerHTML=html;
}

function handleSubmit(e) {
  e.preventDefault();
  var myCity = userCity.value;
  getCityData(myCity);
  userCity.value = "";
  userCity.focus();
}

function handleSavedCityClick(e){
  const myCity = e.target.textContent;
  getCityData(myCity);
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
    // INCLUDE METHOD  -if cities DOESNT include
  if (!cities.includes(city)){
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify (cities));
    addCityToNav(city);
  }
}

//*****ON PAGE LOAD  *************

//need to check to see if anything is in local storage and populate user city
document.querySelector("form").addEventListener("submit", handleSubmit)

function addCityToNav(city){
  const btn= document.createElement("button");
  btn.textContent=city;
  document.querySelector("#savedCities").append(btn);
  btn.addEventListener("click", handleSavedCityClick);
}
  const cities = getCities()
if (cities){
for (let city of cities){
    addCityToNav(city)
}
}

userCity.focus();