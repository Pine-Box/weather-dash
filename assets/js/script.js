




function clear() {
  console.log('clear data')
}

function updateTodaysWeather(data){
    console.log("Todays weather:");
    console.log(data);
    console.log("===================")
}
function updateForecast(data){
    console.log("5 Day forecast:");
    console.log(data);
    console.log("===================")
}


function getWeatherForecast(){
 let cityToFind = "London";
 $("#search-input").val();
 console.log(cityToFind);
 //get the weather today and forecast
 getWeatherForecastByCity(cityToFind);


}

$("#search-button").on("click", getWeatherForecast);
