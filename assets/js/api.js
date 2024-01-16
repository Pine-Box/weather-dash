import {updateTodaysWeather,updateForecast, cityNotFound} from "./script.js";
import {storeHistory} from "./storage.js";
const api_key = "03965cbcf1dc25e44d52076bc83789b8";


class CityNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = "CityNotFound";
    }
}


// function initially gets lat-lon and then sends a request to get current weather and then the forecast for the city.
export function getWeatherForecastByCity( city
) {
    //get lat lon
    let url = "https://api.openweathermap.org/geo/1.0/direct?limit=1&appid=" + api_key + "&q=" + city;
    fetch(url)
        .then(function (response) {
              return response.json();
        })
        .then(function (data) {
            if (data.length === 0)
                throw new CityNotFound('City not found');
            let weather_url ="";
            weather_url = "https://api.openweathermap.org/data/2.5/forecast?lat="
                    + data[0].lat + "&lon="
                    + data[0].lon + "&appid="
                    + api_key;
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
                })

            })
        .catch(err => {
            if (err instanceof CityNotFound){
                cityNotFound();
            }else{
                console.log("ERROR" + err);
            }
        });
}

// returns the celsius equivalent for a given kelvin
export function getCelsiusFromKelvin(kelvin) {
    return Math.floor((kelvin - 273.15)).toString() + " °C";
}
