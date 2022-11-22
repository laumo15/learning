function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  let day = days[now.getDay()];
  let hours = now.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = now.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  return (`${day} ${hours}:${minutes}`);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCity);
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
}
function updateCity(response) {
  let city = document.querySelector("h2");
  let currentCity = response.data.name;
  city.innerHTML = currentCity;
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
}
function updateTemp(response) {
  let currTemp = document.querySelector("#temp");
  let newTemp = Math.round(response.data.main.temp);
  currTemp.innerHTML = newTemp;
}
function updateDescription(response) {
  let currDescr = document.querySelector("#description")
  let newDescr = response.data.weather[0].main;
  currDescr.innerHTML = newDescr;
}
function updateHumidity(response) {
  let currHumidity = document.querySelector("#humidity");
  let newHumidity = response.data.main.humidity;
  currHumidity.innerHTML = `${newHumidity}% humidity`;
}
function updateWindSpeed(response) {
  let currWind = document.querySelector("#wind-speed")
  let newWind = Math.round(response.data.wind.speed);
  currWind.innerHTML = `${newWind}KM/H wind`;
}

function convertToF(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  currentTemperature = number(currentTemperature);
  currentTemperature.innerHTML = math.round((currentTemperature * 9 / 5 ) + 32);
  fahrenheit.classList.add("not-link");
  celsius.classList.remove("not-link");
}
function convertToC(event) {
  event.preventDefault()
  let currentTemperature = document.querySelector("#temp");
  currentTemperature = number(currentTemperature);
  currentTemperature.innerHTML = "16";
  fahrenheit.classList.remove("not-link");
  celsius.classList.add("not-link");
}

let currentTime = document.querySelector("h3");
let now = new Date()
currentTime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveWeather);

let button = document.querySelector("button");
button.addEventListener("click", getLocation);

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
fahrenheit.addEventListener("click", convertToF);
celsius.addEventListener("click", convertToC);