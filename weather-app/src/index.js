function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  let day = days[date.getDay()];
  let hours = date.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return (`${day} ${hours}:${minutes}`);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCity)
}
function retrieveCity(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad"
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(url).then(updateCity);
  axios.get(url).then(updateTemp);
  axios.get(url).then(updateDescription);
  axios.get(url).then(updateHumidity);
  axios.get(url).then(updateWindSpeed);
  axios.get(url).then(updateDate);
  axios.get(url).then(updateIcon);
}
function updateCity(response) {
  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = response.data.name;
}

function retrieveWeather(event) {
  event.preventDefault();
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let inputCity = document.querySelector("#city");
  let city = inputCity.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(updateCity);
  axios.get(url).then(updateTemp);
  axios.get(url).then(updateDescription);
  axios.get(url).then(updateHumidity);
  axios.get(url).then(updateWindSpeed);
  axios.get(url).then(updateDate);
  axios.get(url).then(updateIcon);
}
function updateTemp(response) {
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
}
function updateDescription(response) {
  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = response.data.weather[0].main;
}
function updateHumidity(response) {
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}% humidity`;
}
function updateWindSpeed(response) {
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)}KM/H wind`;
}
function updateDate(response) {
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
}
function updateIcon(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function convertToF(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = Math.round((celsiusTemp * 9 / 5 ) + 32);
  fahrenheit.classList.add("not-link");
  celsius.classList.remove("not-link");
}
function convertToC(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  fahrenheit.classList.remove("not-link");
  celsius.classList.add("not-link");
}

celsiusTemp = null;

navigator.geolocation.getCurrentPosition(retrieveCity);

let currentTime = document.querySelector("#date");
let now = new Date()
currentTime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveWeather);

let button = document.querySelector("button");
button.addEventListener("click", getLocation);

let fahrenheit = document.querySelector("#fahrenheit-link");
let celsius = document.querySelector("#celsius-link");
fahrenheit.addEventListener("click", convertToF);
celsius.addEventListener("click", convertToC);