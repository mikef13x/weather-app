var searchBtn = document.querySelector("#searchBtn");
var apiKey = "b031be29ab7cf942b380be333377328d"
var city = document.querySelector(".city")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
var dayOneTemp = document.querySelector(".dayOneTemp")
var dayTwoTemp = document.querySelector(".dayTwoTemp")
var dayThreeTemp = document.querySelector(".dayThreeTemp")
var dayFourTemp = document.querySelector(".dayFourTemp")
var dayFiveTemp = document.querySelector(".dayFiveTemp")
var dayOneWind = document.querySelector(".dayOneWind")
var dayTwoWind = document.querySelector(".dayTwoWind")
var dayThreeWind = document.querySelector(".dayThreeWind")
var dayFourWind = document.querySelector(".dayFourWind")
var dayFiveWind = document.querySelector(".dayFiveWind")
var dayOneHumidity = document.querySelector(".dayOneHumidity")
var dayTwoHumidity = document.querySelector(".dayTwoHumidity")
var dayThreeHumidity = document.querySelector(".dayThreeHumidity")
var dayFourHumidity = document.querySelector(".dayFourHumidity")
var dayFiveHumidity = document.querySelector(".dayFiveHumidity")
var today = dayjs().format("M/D/YYYY")
var dayOne = document.querySelector(".dayOne");
var dayTwo = document.querySelector(".dayTwo")
var dayThree = document.querySelector(".dayThree")
var dayFour = document.querySelector(".dayFour")
var dayFive = document.querySelector(".dayFive")


function getCoords() {
    var cityName = document.querySelector("#userInput").value;
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
    return fetch(cityUrl)
        .then(response => response.json())
        .then(data => {
            var lat = data[0]["lat"]
            var lon = data[0]["lon"]
            return { lat, lon };
        })
}

function getWeather() {
    getCoords().then(coords => {
        var lat = coords.lat;
        var lon = coords.lon;
        console.log(lat)

        var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

        fetch(weatherUrl)
            .then(response => response.json())

            .then(data => {
                var cityValue = data['city']['name'] + ": (" + today + ") ";
                var tempValue = data['list'][0]['main']['temp'] + "\u00B0F";
                var windSpeed = data['list'][0]['wind']['speed'] + " MPH";
                var humidityValue = data['list'][0]['main']['humidity'] + "%";

                humidity.innerHTML = "Humidity: " + humidityValue;
                wind.innerHTML = "Wind: " + windSpeed;
                temp.innerHTML = "Temp: " + tempValue;
                city.innerHTML = cityValue;
                console.log(data)
            })
    })
}

function getForecast() {
    getCoords().then(coords => {
        var lat = coords.lat;
        var lon = coords.lon;

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

        fetch(forecastUrl)
            .then(response => response.json())

            .then(data => {
                var tempValue = data['list'][4]['main']['temp'] + "\u00B0F";
                dayOneTemp.innerHTML = "Temp: " + tempValue;

                var tempValue = data['list'][12]['main']['temp'] + "\u00B0F";
                dayTwoTemp.innerHTML = "Temp: " + tempValue;

                var tempValue = data['list'][20]['main']['temp'] + "\u00B0F";
                dayThreeTemp.innerHTML = "Temp: " + tempValue;

                var tempValue = data['list'][28]['main']['temp'] + "\u00B0F";
                dayFourTemp.innerHTML = "Temp: " + tempValue;

                var tempValue = data['list'][36]['main']['temp'] + "\u00B0F";
                dayFiveTemp.innerHTML = "Temp: " + tempValue;

                var windSpeed = data['list'][4]['wind']['speed'] + " MPH";
                dayOneWind.innerHTML = "Wind: " + windSpeed;

                var windSpeed = data['list'][12]['wind']['speed'] + " MPH";
                dayTwoWind.innerHTML = "Wind: " + windSpeed;

                var windSpeed = data['list'][20]['wind']['speed'] + " MPH";
                dayThreeWind.innerHTML = "Wind: " + windSpeed;

                var windSpeed = data['list'][28]['wind']['speed'] + " MPH";
                dayFourWind.innerHTML = "Wind: " + windSpeed;

                var windSpeed = data['list'][36]['wind']['speed'] + " MPH";
                dayFiveWind.innerHTML = "Wind: " + windSpeed;

                var humidityValue = data['list'][4]['main']['humidity'] + "%";
                dayOneHumidity.innerHTML = "Humidity: " + humidityValue;

                var humidityValue = data['list'][12]['main']['humidity'] + "%";
                dayTwoHumidity.innerHTML = "Humidity: " + humidityValue;

                var humidityValue = data['list'][20]['main']['humidity'] + "%";
                dayThreeHumidity.innerHTML = "Humidity: " + humidityValue;

                var humidityValue = data['list'][28]['main']['humidity'] + "%";
                dayFourHumidity.innerHTML = "Humidity: " + humidityValue;

                var humidityValue = data['list'][36]['main']['humidity'] + "%";
                dayFiveHumidity.innerHTML = "Humidity: " + humidityValue;

                var dateValue = dayjs().add(1, "day").format("M/D/YYYY");
                dayOne.innerHTML = dateValue;

                var dateValue = dayjs().add(2, "day").format("M/D/YYYY");
                dayTwo.innerHTML = dateValue;

                var dateValue = dayjs().add(3, "day").format("M/D/YYYY");
                dayThree.innerHTML = dateValue;

                var dateValue = dayjs().add(4, "day").format("M/D/YYYY");
                dayFour.innerHTML = dateValue;

                var dateValue = dayjs().add(5, "day").format("M/D/YYYY");
                dayFive.innerHTML = dateValue;


            })
    })
}
searchBtn.addEventListener("click", getCoords)
searchBtn.addEventListener("click", getWeather)
searchBtn.addEventListener("click", getForecast)