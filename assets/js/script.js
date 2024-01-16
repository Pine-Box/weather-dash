

import {getCurrentDay, getDateFromUnix, getDayFromUnix, getHourFromUnix} from "./datetime.js";
import {getCelsiusFromKelvin, getWeatherForecastByCity} from "./api.js";
import {loadHistory, storeHistory} from "./storage.js";



// clears the weather data displayed
function clear() {
    console.log('clear data')
    setForecast(1, null,true);
    setForecast(2, null,true);
    setForecast(3, null,true);
    setForecast(4, null,true);
    setForecast(5, null,true);
    $(".city-today").text("Today's weather in ");
    $(".city-today-date").text("");
    $(".city-today-temp").text("");
    $(".city-today-wind").text("");
    $(".city-today-humidity").text("");
    $("#search-input").val("")
    $("#search-input").attr("placeholder","London");
}

//exception handler logging that openweather result returned empty array. Should add a modal here
export function cityNotFound(){
   console.log("City not found at all");
   clear();
}

//sets the weather forecast data if clear is false otherwise if true it clears weather forecast data
function setForecast(day, data, clear){
    if (clear === true) {
        $("#city-" + day + "-weathericon").attr("src","#");
        $(".city-" + day + "-title").text("");
        $(".city-" + day + "-date").text("");
        $(".city-" + day + "-temp").text("");
        $(".city-" + day + "-wind").text("");
        $(".city-" + day + "-humidity").text("");
    }else {
        $("#city-" + day + "-weathericon").attr("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
        $(".city-" + day + "-title").text(getDayFromUnix(data.dt));
        $(".city-" + day + "-date").text(getDateFromUnix(data.dt));
        $(".city-" + day + "-temp").text(getCelsiusFromKelvin(data.main.temp));
        $(".city-" + day + "-wind").text(data.wind.speed + " KPH");
        $(".city-" + day + "-humidity").text(data.main.humidity + '%');

    }
}

//updates display with today's weather data
export function updateTodaysWeather(data){
    addButton(data.name);
    $(".city-today").text("Today's weather in "+ data.name);
    $("#city-today-weathericon").attr("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+".png");
    $(".city-today-date").text(getCurrentDay());
    $(".city-today-temp").text(getCelsiusFromKelvin( data.main.temp));
    $(".city-today-wind").text(data.wind.speed + " KPH");
    $(".city-today-humidity").text(data.main.humidity + '%');
}

//updates display with 5 day weather forecast
export function updateForecast(data){
    let day = 1;
    for (let i=0; i< data.list.length; i++) {
        if (getHourFromUnix(data.list[i].dt) === "00") {
          setForecast(day, data.list[i], false);
          day = day + 1;
        }
    }
}

//adds a button to history node and sets the margins and links event
function addButton(name){
       const $button = $("<button class=\"btn btn-secondary btn-history \">"+name+"</button>");
       $button.css("margin-bottom","5px");
       $button.on("click", getWeatherForecastFromHistory);
      $("#history").prepend($button);
}

//initialises state when page is refreshed - clears data and reloads history
function init(){
   clear();
   let lastSearches = loadHistory();
   $("#history").empty();
   for (let i =0; i < lastSearches.length; i++){
        addButton(lastSearches[i].city );
   }

}

//gets todays weather and 5 day forecast for search entered
function getWeatherForecast(ev){
    ev.preventDefault();
    console.log("search click")
     let cityToFind = $("#search-input").val();
     if (cityToFind.trim() === ""){
            cityToFind = 'London';
           getWeatherForecastByCity("London");
     } else {
         getWeatherForecastByCity(cityToFind);
     }
     storeHistory(cityToFind);
     $("#search-input").val("");
}


//eventlistner handler for the history search - history search is not stored again to local storage.
function getWeatherForecastFromHistory(ev){
    ev.preventDefault();
    console.log("history click")
   getWeatherForecastByCity(ev.currentTarget.textContent);
}

init();
//search button listener
$("#search-button").on("click", getWeatherForecast);

