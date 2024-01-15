import {updateTodaysWeather,updateForecast} from "./script.js";
const api_key = "03965cbcf1dc25e44d52076bc83789b8";


export function getWeatherForecastByCity( city
) {
    //get lat lon
    let url = "https://api.openweathermap.org/geo/1.0/direct?limit=1&appid=" + api_key + "&q=" + city;
    console.log("geo url:" + url );
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("geo data :");
            console.log(data[0].name);
            console.log(data[0].lat);
            console.log(data[0].lon);
            console.log("=========================================")
            let weather_url ="";
            weather_url = "https://api.openweathermap.org/data/2.5/forecast?lat="
                    + data[0].lat + "&lon="
                    + data[0].lon + "&appid="
                    + api_key;
            console.log("forecast url: " + weather_url);
            console.log("today's weather");
             let weather_today_url = "";
             weather_today_url = "https://api.openweathermap.org/data/2.5/weather?lat="
                    + data[0].lat + "&lon="
                    + data[0].lon + "&appid="
                    + api_key;
            fetch(weather_url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (forecast_data) {
                    updateForecast(forecast_data);
                });
            fetch(weather_today_url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (today_data) {
                    updateTodaysWeather(today_data);
                });
        });
}


export function getCelsiusFromKelvin(kelvin) {
    return Math.floor((kelvin - 273.15)).toString() + " °C";
}
