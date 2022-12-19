function getForecast(coordinates) {
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  let temperature = Math.round(celciusTemp);
  let temperatureElement = document.querySelector("#degree-number");
  temperatureElement.innerHTML = temperature;
  let humid = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  description.innerHTML = response.data.weather[0].description;
  humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(newName) {
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function handleClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector("input");
  let newName = cityInput.value;
  search(newName);
}

let searchBtn = document.querySelector("#searchButton");
searchBtn.addEventListener("click", handleClick);

let date = document.querySelector("#currentDate");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
date.innerHTML = `${day} ${hours}:${minutes}`;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row days">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    ${formatDay(forecastDay.dt)}
    <br />
    <img
      class="days-emojis"
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
    />
    <br />
    <div class="daily-degrees"><strong>${Math.round(
      forecastDay.temp.max
    )}°</strong> ${Math.round(forecastDay.temp.min)}°</div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showFarenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree-number");
  let farenheitTemperature = Math.round((celciusTemp * 9) / 5 + 32);
  celcius.classList.remove("active");
  farenheit.classList.add("active");
  tempElement.innerHTML = farenheitTemperature;
}
function showCelciusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree-number");
  tempElement.innerHTML = Math.round(celciusTemp);
  celcius.classList.add("active");
  farenheit.classList.remove("active");
}
let celciusTemp = null;
let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", showFarenheitTemp);
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", showCelciusTemp);
search("New York");
