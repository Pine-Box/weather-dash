# Weather Dashboard

## Background

We are to develop a weather dashboard which will display the current days weather and a 5 day forecast.

Searches should be stored in local storage. Note no criteria was set for :

1. Limit to the history to be stored
2. Duplicate searches to be stored 
3. If a search cannot find a city 

In the case of 3. I have implemented exception handling which if a city is not found it  clears the entries no message.
If there is any other error encountered this will be logged to the console.

## User Story

```text
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user click on a city in the search history they are again presented with current and future conditions for that city

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for London.](./assets/img/10-server-side-apis-challenge-demo.png)

##Deliverables

The landing page for the dashboard is:

[https://pine-box.github.io/weather-dash/](https://pine-box.github.io/weather-dash/)


![Weather Dashboard Landing Page](https://github.com/Pine-Box/weather-dash/blob/main/assets/img/weather-dash.png)

