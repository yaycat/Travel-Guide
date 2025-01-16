# Travel-Guide
This project is a Node.js-based web application that displays weather information and currency exchange rates based on the user's location.
It uses several APIs to gather data, including:
    OpenWeather API: Fetches weather details.
    Fixer.io API: Provides currency exchange rates.
    IP-API: Determines the user's geographic location based on their IP address.
    Yandex Maps API: Displays an interactive map with the user's location marked.

-----
Features:
Real-time weather information, including:
Temperature
Feels like temperature
Humidity
Pressure
Wind speed
Rain volume (if available)
Country and coordinates
Currency exchange rates for EUR to KZT, RUB, CNY, KGS, and USD.
Interactive map with the user's location marked using Yandex Maps.
Responsive design with styled HTML for better user experience.

-----
Installation and Setup
Prerequisites:
    Node.js installed on your system.
    Internet access to fetch data from APIs.

Install dependencies: Run the following command in the project folder:
    npm install axios
    npm install express
    node as2.js
Access the application: Open your browser and navigate to:
    http://localhost:3100
    
-----
APIs Used
IP-API:
    URL: http://ip-api.com/json/
    Purpose: Retrieves the user's geographic location based on their IP address.

OpenWeather API:
    URL: http://api.openweathermap.org/data/2.5/weather
    Purpose: Provides weather data for the user's location.
    API Key: Replace the placeholder with your own key.

Fixer.io API:
    URL: http://data.fixer.io/api/latest
    Purpose: Fetches real-time currency exchange rates.
    API Key: Replace the placeholder with your own key.

Yandex Maps API:
    URL: https://api-maps.yandex.ru/2.1/
    Purpose: Displays an interactive map with a marker at the user's location.

-----
Project structure:

project-folder/

├── public/              # Folder for static assets (CSS, images, etc.)

├── app.js               # Main application file

├── package.json         # Dependencies and project metadata

└── README.md            # Project documentation

