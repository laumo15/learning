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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(updateCity);
  axios.get(url).then(updateTemp);
  axios.get(url).then(updateDescription);
  axios.get(url).then(updateHumidity);
  axios.get(url).then(updateWindSpeed);
  axios.get(url).then(updateDate);
  axios.get(url).then(updateIcon);
  axios.get(url).then(getForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city")
  search(inputCity.value);
}

function search(city) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(updateCity);
  axios.get(url).then(updateTemp);
  axios.get(url).then(updateDescription);
  axios.get(url).then(updateHumidity);
  axios.get(url).then(updateWindSpeed);
  axios.get(url).then(updateDate);
  axios.get(url).then(updateIcon);
  axios.get(url).then(getForecast);
}
function updateCity(response) {
  let cityElement = document.querySelector("h2")
  cityElement.innerHTML = response.data.name
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
function getForecast(response) {
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lat}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
      forecastHTML +
      `
      <div class="col">
          <div class="card mb-3 next-days" style="max-width: 200px;">
              <div class="row g-0">
                  <h5>${formatDay(forecastDay.dt)}</h5>
                  <div class="col-md-4">
                  <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
                  </div>
                  <div class="col-md-8">
                  <div class="card-body">
                      <p class="card-text">${Math.round(forecastDay.temp.max)} </br> ${Math.round(forecastDay.temp.min)} C</p>
                  </div>
                  </div>
              </div>
          </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

let currentTime = document.querySelector("#date");
let now = new Date()
currentTime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", getLocation);

let fahrenheit = document.querySelector("#fahrenheit-link");
let celsius = document.querySelector("#celsius-link");
fahrenheit.addEventListener("click", convertToF);
celsius.addEventListener("click", convertToC);

search("Milan");