var searchBtn = document.querySelector("#searchBtn");
var apiKey = "b031be29ab7cf942b380be333377328d"
var city = document.querySelector(".city")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var humidity = document.querySelector(".humidity")
var today = dayjs().format("M/D/YYYY")
var cityHistory = JSON.parse(localStorage.getItem("history")) || []

var searchHistoryBtn = document.querySelector(".searchBtn");
var searchBox = document.querySelector(".searchHistory");


function popCoords (cityName) {
    var cityUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
    console.log(cityUrl)
    return fetch(cityUrl)
        .then(response => response.json())
        .then(data => {
            var lat = data[0]["lat"]
            var lon = data[0]["lon"]
            return { lat, lon };

        })
        .then(coords => {
            document.querySelector("#userInput").value = "";

            return coords;
        });

}
 
function getCoords() {
    var cityName = document.querySelector("#userInput").value;
    if (cityName) {
      getWeather(cityName);
    }
   
}

function getWeather(cityName) {
    popCoords(cityName).then(coords => {
        var lat = coords.lat;
        var lon = coords.lon;

        var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

        fetch(weatherUrl)
            .then(response => response.json())

            .then(data => {

                var cityValue = data['city']['name'] + ": (" + today + ") ";
                var tempValue = data['list'][0]['main']['temp'] + "\u00B0F";
                var windSpeed = data['list'][0]['wind']['speed'] + " MPH";
                var humidityValue = data['list'][0]['main']['humidity'] + "%";
                var weatherIcon = data['list'][0]['weather'][0]['icon']


                humidity.innerHTML = "Humidity: " + humidityValue;
                wind.innerHTML = "Wind: " + windSpeed;
                temp.innerHTML = "Temp: " + tempValue;
                city.innerHTML = cityValue + "<img src = 'https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'> ";
                console.log(weatherUrl)
                console.log(weatherIcon)
                setHistory(data['city']['name'])
                getHistory();
               getForecast(data.city.name);
            })

    })
}

function getForecast(cityName) {
    popCoords(cityName).then(coords => {
        var lat = coords.lat;
        var lon = coords.lon;

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";

        fetch(forecastUrl)
            .then(response => response.json())

            .then(data => {

                for (i = 7; i < data.list.length; i = i + 8) {
                    var dt = data["list"][i]['dt']
                    var weatherIcon = data['list'][i]['weather'][0]['icon']
                    var tempValue = data['list'][i]['main']['temp'] + "\u00B0F";
                    document.querySelector(".temp" + i).innerHTML = "Temp: " + tempValue;

                    var windSpeed = data['list'][i]['wind']['speed'] + " MPH";
                    document.querySelector(".wind" + i).innerHTML = "Wind: " + windSpeed;

                    document.querySelector(".img" + i).src = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

                    var dateValue = dayjs.unix(dt).format("M/D/YYYY");
                    document.querySelector(".date" + i).innerHTML = dateValue;

                    var humidityValue = data['list'][i]['main']['humidity'] + "%";
                    document.querySelector(".hum" + i).innerHTML = "Humidity: " + humidityValue;

                }
            })
    })
}


function setHistory(cityName) {
    
    if (!cityHistory.join("").includes(cityName)) {

          cityHistory.push(cityName)
        localStorage.setItem("history", JSON.stringify(cityHistory))
    }
}

function getHistory() {
    localStorage.getItem(cityHistory)
    var cityButton = document.createElement("button")
    cityButton.classList.add("searchBtn")
    searchBox.textContent = "";
    for (i = cityHistory.length-1; i > cityHistory.length-6; i--) {
        var button = document.createElement("button")
        button.classList.add("searchBtn")
        button.innerHTML = cityHistory[i]
        if (cityHistory[i]) {
            searchBox.append(button);
        }
       
    }
    
}

getHistory();


function searchPast(event) {

if(event.target.matches("button")) {
    getWeather(event.target.textContent)
    
}

}


//pop data in local storage and append buttons
searchBox.addEventListener("click", searchPast);
searchBtn.addEventListener("click", getCoords)
// searchBtn.addEventListener("click", getWeather)
// searchBtn.addEventListener("click", getForecast)