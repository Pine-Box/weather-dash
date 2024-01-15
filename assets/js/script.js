

import {getCurrentDay, getDateFromUnix, getDayFromUnix} from "./datetime.js";
import {getCelsiusFromKelvin, getWeatherForecastByCity} from "./api.js";
import {loadHistory, storeHistory} from "./storage.js";


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

export function cityNotFound(){
   console.log("City not found at all");
   clear();
}

function setForecast(day, data, clear){
    if (clear === true) {
        $(".city-" + day + "-title").text("");
        $(".city-" + day + "-date").text("");
        $(".city-" + day + "-temp").text("");
        $(".city-" + day + "-wind").text("");
        $(".city-" + day + "-humidity").text("");
    }else {
        $(".city-" + day + "-title").text(getDayFromUnix(data.dt));
        $(".city-" + day + "-date").text(getDateFromUnix(data.dt));
        $(".city-" + day + "-temp").text(getCelsiusFromKelvin(data.main.temp));
        $(".city-" + day + "-wind").text(data.wind.speed + " KPH");
        $(".city-" + day + "-humidity").text(data.main.humidity + '%');
    }
}

export function updateTodaysWeather(data){
    console.log("Todays weather:");
    console.log(data);
    console.log("===================")
    console.log("<button class=\"btn btn-secondary mb-2>\" "+data.name+"</button>")
    $("#history").prepend("<button class=\"btn btn-secondary mb-2\">"+data.name+"</button>");
    $(".city-today").text("Today's weather in "+ data.name);
    $(".city-today-date").text(getCurrentDay());
    $(".city-today-temp").text(getCelsiusFromKelvin( data.main.temp));
    $(".city-today-wind").text(data.wind.speed + " KPH");
    $(".city-today-humidity").text(data.main.humidity + '%');
}
export function updateForecast(data){
    console.log("5 Day forecast:");
    console.log(data.list[3]);
    console.log("===================")

    setForecast(1, data.list[3],false);
    setForecast(2, data.list[11],false);
    setForecast(3, data.list[21],false);
    setForecast(4, data.list[31],false);
    setForecast(5, data.list[39],false);

}

function init(){
   clear();
   let lastSearches = loadHistory();
   $("#history").empty();
   console.log(lastSearches);
   for (let i =0; i < lastSearches.length; i++){
      $("#history").prepend("<button class=\"btn btn-secondary btn-history mb-2\">"+lastSearches[i].city +"</button>");
   }
}

function getWeatherForecast(){
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

function getWeatherForecastFromHistory(ev){
   console.log("history");
   console.log(ev.currentTarget.textContent);
   getWeatherForecastByCity(ev.currentTarget.textContent);
}

init();
//search button listener
$("#search-button").on("click", getWeatherForecast);

$(".btn-history").on("click", getWeatherForecastFromHistory);