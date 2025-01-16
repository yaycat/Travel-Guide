const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const apiKey = '5cb3df0645f1fffb7ea7aa9dc44186ab'; // OpenWeather API
const fixerApiKey = 'c63098bce290d9e01b1fde5be58b77ea'; // Fixer.io API
const yandexApiKey = '56927d48-1e8a-4392-9a1b-f9d0b8a39662'; // yandex API
const geoLocationUrl = 'http://ip-api.com/json/'; // Ip adress API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        // getting geolocation
        const geoResponse = await axios.get(geoLocationUrl); 
         // naming geolocation
        const userLocation = geoResponse.data;
        // writting into console
        console.log('Geolocation data:', userLocation); 

        // getting долготу и широту и город
        const { lat, lon, city } = userLocation; 

        // if city not found
        const validCity = city || 'Invalid city';

        // getting weather from url and API Key
        const weatherUrl = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;

        // exchange through fixer io
        const fixerUrl = `http://data.fixer.io/api/latest?access_key=${fixerApiKey}&symbols=KZT,RUB,CNY,KGS,USD`;
        const exchangeResponse = await axios.get(fixerUrl);
        const exchangeRates = exchangeResponse.data.rates;

        if (weatherData.cod === 200) {
            // import data from weather API 
            const main = weatherData.main;
            const weather = weatherData.weather[0];
            const wind = weatherData.wind;
            const sys = weatherData.sys;
            const coordinates = weatherData.coord;

            // getting information from weather API and geolocation
            const temperature = main.temp;
            const feelsLike = main.feels_like;
            const humidity = main.humidity;
            const pressure = main.pressure;
            const weatherDescription = weather.description;
            const weatherIcon = weather.icon;
            const windSpeed = wind.speed;
            const country = sys.country;
            const rain = weatherData.rain ? weatherData.rain['3h'] : 0;

            res.send(`
                <html>
                    <head>
                        <title>Travel Guide</title>
                        <script src="https://api-maps.yandex.ru/2.1/?apikey=${yandexApiKey}&lang=ru_RU" type="text/javascript"></script>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f9;
                                margin: 0;
                                padding: 20px;
                            }
                            h1 {
                                display: flex;
                                justify-content: center;
                                color: #8b8b8b;
                            }
                            p {
                                font-size: 18px;
                                line-height: 1.5;
                            }
                            .exchange-info {
                                background-color: #8b8b8b;
                                border-radius: 90px;
                                padding: 20px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                width:15%;
                            }
                            .weather-block {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 20px;
                                background-color: #8b8b8b;
                                padding: 20px;
                                border-radius: 100px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                justify-content: space-around;
                            }       
                            .weather-info {
                                background-color: #ccc3c3;
                                border-radius: 8px;
                                padding: 20px;
                                border-radius: 100px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                width: 220px;
                                text-align: center;
                            }       
                            .weather-info img {
                                width:90px;
                                height:90px;
                                vertical-align: middle;
                            }
                            #map {
                                height: 520px;
                                margin-top: 20px;
                                border-radius: 90px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                width: 85%;
                            }
                            .block-w-e {
                                display: flex;
                                justify-content: space-between;
                                margin-top: 20px;
                                gap: 20px;
                            }
                            .footer {
                                margin-top: 40px;
                                padding: 10px 20px;
                                background-color: #333;
                                color: #fff;
                                text-align: center;
                                font-size: 14px;
                                border-radius: 8px;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Weather in ${city}</h1>
                        <div class="weather-block">
                            <div class="weather-info">
                                <p>Temperature: ${temperature} °C</p>
                                <p>Feels Like: ${feelsLike} °C</p>
                            </div>
                            <div class="weather-info">
                                <p>Weather: ${weatherDescription}</p>
                                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon">
                            </div>
                            <div class="weather-info">
                                <p>Wind Speed: ${windSpeed} m/s</p>
                                <p>Rain Volume: ${rain} mm</p>
                            </div>
                            <div class="weather-info">
                                <p>Humidity: ${humidity} %</p>
                                <p>Pressure: ${pressure} hPa</p>
                            </div>
                            <div class="weather-info">
                                <p>Coordinates: ${coordinates.lat}, ${coordinates.lon}</p>
                                <p>Country Code: ${country}</p>
                            </div>
                        </div>

                        <div class="block-w-e">
                            <div id="map"></div>
                            <div class="exchange-info">
                                <h2 style="color: #17d155;">Exchange for 1 EURO:</h2>
                                <p style="background-color: #ccc3c3; border-radius: 90px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color:rgb(0, 0, 0); display:flex; justify-content: center;">${exchangeRates.KZT || "Unavailable"} KZT</p>
                                <p style="background-color: #ccc3c3; border-radius: 90px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color:rgb(0, 0, 0); display:flex; justify-content: center;">${exchangeRates.RUB || "Unavailable"} RUB</p>
                                <p style="background-color: #ccc3c3; border-radius: 90px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color:rgb(0, 0, 0); display:flex; justify-content: center;">${exchangeRates.CNY || "Unavailable"} CNY</p>
                                <p style="background-color: #ccc3c3; border-radius: 90px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color:rgb(0, 0, 0); display:flex; justify-content: center;">${exchangeRates.KGS || "Unavailable"} KGS</p>
                                <p style="background-color: #ccc3c3; border-radius: 90px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); color:rgb(0, 0, 0); display:flex; justify-content: center;">${exchangeRates.USD || "Unavailable"} USD</p>
                            </div>
                        </div>

                        <script>
                            ymaps.ready(init);
                            function init() {
                                const myMap = new ymaps.Map("map", {
                                    center: [${coordinates.lat}, ${coordinates.lon}],
                                    zoom: 10
                                });
                                const myPlacemark = new ymaps.Placemark([${coordinates.lat}, ${coordinates.lon}], {
                                    hintContent: '${city}',
                                    balloonContent: 'Weather Location'
                                });
                                myMap.geoObjects.add(myPlacemark);
                            }
                        </script>

                        <div class="footer">
                            &copy; 2025 Weather and Map App. All rights reserved.
                        </div>
                    </body>
                </html>
            `); // html code
        } else {
            res.send('<h1>City not found!</h1>'); // if city not found
        }
    } catch (error) { // if unable to fetch weather
        console.error('Error fetching data:', error);
        res.send('<h1>Unable to fetch weather data</h1>');
    }
});

app.listen(3100, () => {
    console.log('Server is running on http://localhost:3100');
});