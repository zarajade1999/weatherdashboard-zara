var cityInput = document.querySelector("#city-input");
var searchButton = document.querySelector("#search-btn");
var weatherCardsDiv = document.querySelector(".weather-cards");
var currentWeatherDiv = document.querySelector(".current-weather");

var apiKey = "4042fbf7148125891f42afb3288572db"; // this is my individual  key for the weather api


var createWeatherCard = (cityName, weatherItem, index) => {
    console.log(weatherItem)
    if (index === 0) { //html for main weather card
        return `<div class="details">
                <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                <h4>Temp:${(weatherItem.main.temp = 273.15).toFixed(2)} °C</h4>
                <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            <div class="icon">
                      <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                 <h4>${weatherItem.weather[0].description}</h4>
             </div> `;
 
    } else { //html for the rest of the five day forecast card
    return ` <li class="card"> 
            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3> 
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt = "weather-icon">
            <h4>Temp:${(weatherItem.main.temp = 273.15).toFixed(2)} °C</h4>
            <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>`;
    }
} 
var getWeatherInfo = (cityName, lat, lon) => {
    var weatherCodeApi = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}`;
   fetch(weatherCodeApi) //fetching the api link itself
    .then(function (response) { 
        return response.json(); //returning the response to an object so its easier to read
    })
    .then(function (data) { 
         weatherCardsDiv.innerHTML = "";
         currentWeatherDiv.innerHTML = "";
        for(var i=0; i < data.list.length; i+=8){
            if(i === 0) {

            currentWeatherDiv.innerHTML = createWeatherCard(cityName,data.list[i],i); 
            } else {
                console.log(weatherCardsDiv)
            weatherCardsDiv.innerHTML+=createWeatherCard(cityName,data.list[i],i);
            
            }
        }
       
        cityInput.value = "";
         

    }).catch((e) => {
        console.log(e)
    });
}
var getCityDetails = (event) => {
    console.log(event)
    var cityName = cityInput.value.trim() //trim removes whitespace between characters
    if(!cityName) return; //! is a shorthand for NOT, this will return if the variable cityName is empty

    var geocodeApi=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    // This will retrieve inputted city coordinates eg latitude, longitude and name from api
    fetch(geocodeApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
      if (!data.length) return alert("No data found for ${cityName}");
      var {name, lat, lon } = data[0];
      getWeatherInfo(name, lat, lon);
    }).catch(() => {
        alert("An error has occured while retrieving the location data");
    });
    
}
   
document.addEventListener("DOMContentLoaded", () => {
searchButton.addEventListener("click", getCityDetails)
});

