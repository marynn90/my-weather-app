function handleClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector("input");
  let nameCity = document.querySelector("#city");
  let newName = cityInput.value;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  nameCity.innerHTML = capitalizeFirstLetter(newName);
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newName}&appid=${apiKey}&units=metric`;

  function showTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperature2 = document.querySelector("#degree-number");
    temperature2.innerHTML = temperature;
    let humid = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    humid.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  }
  axios.get(apiUrl).then(showTemp);
}
let searchBtn = document.querySelector("#searchButton");
searchBtn.addEventListener("click", handleClick);

let date = document.querySelector("#currentDate");
let now = new Date();
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
date.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()}`;

function showCurrent(event) {
  event.preventDefault();
  function showPosition(position) {
    let latitude = position.coords.latitude;
    console.log(latitude);
    let longitude = position.coords.longitude;
    let apiKey2 = "ad793a6d772939c31783de5822791acf";
    let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=metric`;
    function showCurrent(response) {
      console.log(response);
      let nameCityy = document.querySelector("#city");
      nameCityy.innerHTML = response.data.name;
      let temperaturee = Math.round(response.data.main.temp);
      let temperature22 = document.querySelector("#degree-number");
      temperature22.innerHTML = temperaturee;
      let humidd = document.querySelector("#humidity");
      let windd = document.querySelector("#wind");
      let descriptionn = document.querySelector("#description");
      descriptionn.innerHTML = response.data.weather[0].description;
      humidd.innerHTML = `Humidity: ${response.data.main.humidity}%`;
      windd.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
    }
    axios.get(apiUrl2).then(showCurrent);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentBtn = document.querySelector("#currentButton");
currentBtn.addEventListener("click", showCurrent);
