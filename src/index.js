//Date and Time
function formatDate(timestamp) {
  let currentTime = new Date(timestamp);

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

// Timestamp

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Using Onecall api to get coordinates for the forecast

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3a6fe3259445cfb2e45add19395f004f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

// Forecast

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
  forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.dt
              )}</div>

              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />

              <div class="weather-forecast-temp">
                <span class="weather-forecast-max-temp">${Math.round(
                  forecastDay.temp.max
                )}°</span>|<span
                  class="weather-forecast-min-temp"
                  >${Math.round(forecastDay.temp.min)}°</span
                >
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Function to use for readable sunrise & sunset

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}
// Weather Conditions from current weather data API

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
    response.data.weather[0].description;
  document.querySelector(`#icon`).innerHTML = icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector(`#sunrise`).innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );

  document.querySelector(`#sunset`).innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;

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

  getForecast(response.data.coord);
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

// Temperature conversions and active links
let celsiusTemp = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  document.querySelector(`#temperature`).innerHTML = fahrenheitTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector(`#temperature`).innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", showCelsiusTemp);

// Default city
searchCity("Kumbo");
