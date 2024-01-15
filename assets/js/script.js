

import {getCurrentDay, getDateFromUnix, getDayFromUnix} from "./datetime.js";
import {getCelsiusFromKelvin, getWeatherForecastByCity} from "./api.js";


function clear() {
  console.log('clear data')
}

function setForecast(day, data){
    $(".city-" + day+ "-title").text(getDayFromUnix(data.dt));
    $(".city-" + day + "-date").text(getDateFromUnix(data.dt));
    $(".city-" + day + "-temp").text(getCelsiusFromKelvin( data.main.temp));
    $(".city-" + day + "-wind").text(data.wind.speed + " KPH");
    $(".city-" + day + "-humidity").text(data.main.humidity + '%');
}

export function updateTodaysWeather(data){
    console.log("Todays weather:");
    console.log(data);
    console.log("===================")
    let iconSrc  = 'https://openweathermap.org/img/w/'+data.weather[0].icon+'.png'
    console.log(iconSrc);
    $(".city-today").text("Today's weather in "+ data.name);
    //$(".city-today-icon").attr("src",iconSrc);
    $(".city-today-date").text(getCurrentDay());
    $(".city-today-temp").text(getCelsiusFromKelvin( data.main.temp));
    $(".city-today-wind").text(data.wind.speed + " KPH");
    $(".city-today-humidity").text(data.main.humidity + '%');
}
export function updateForecast(data){
    console.log("5 Day forecast:");
    console.log(data.list[3]);
    console.log("===================")
    setForecast(1, data.list[3]);
    setForecast(2, data.list[11]);
    setForecast(3, data.list[21]);
    setForecast(4, data.list[31]);
    setForecast(5, data.list[39]);
}


function getWeatherForecast(){
 let cityToFind = "London";
 $("#search-input").val();
 console.log(cityToFind);
 //get the weather today and forecast
 getWeatherForecastByCity(cityToFind);


}



 console.log(getDateFromUnix(1705320327));
console.log(getCelsiusFromKelvin(100));

$("#search-button").on("click", getWeatherForecast);
