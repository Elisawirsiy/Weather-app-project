//Date and Time
function formatDate(date) {
  let currentTime = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentTime.getMonth()];
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`; // or use concat() ="0".concat(hours)
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dates = currentTime.getDate();
  if (dates < 10) {
    dates = `0${dates}`;
  }

  return `${day}, ${dates} ${month}<br>${hours}:${minutes}`;
}

//let currentTime = new Date();
//let todaysDate = document.querySelector(`#date`);
//todaysDate.innerHTML = formatDate(currentTime);

// Show Weather Conditions
function displayWeatherParameter(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#date`).innerHTML = formatDate(
    response.data.dt * 1000
  );
  celsiusTemp = response.data.main.temp; //variable has been created as a global var
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;
  document.querySelector(`#icon`).innerHTML = icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#sunrise`).innerHTML = response.data.sys.sunrise;

  document.querySelector(`#sunset`).innerHTML = response.data.sys.sunset;

  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(`#low`).innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(`#high`).innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(`#feeling`).innerHTML = Math.round(
    response.data.main.feels_like
  );
}

// Show Entered city
function searchCity(city) {
  let apiKey = "3a6fe3259445cfb2e45add19395f004f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherParameter);
}

function getSearchedCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(`#city-name`).value;
  searchCity(cityName);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", getSearchedCity);

// Current position button

function showPosition(position) {
  let apiKey = "3a6fe3259445cfb2e45add19395f004f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherParameter);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector(`#current-location-button`);
currentLocationButton.addEventListener("click", getPosition);

// Temperature conversions
let celsiusTemp = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  document.querySelector(`#temperature`).innerHTML = fahrenheitTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector(`#temperature`).innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity(`Bamenda`);
