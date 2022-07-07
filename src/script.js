let now = new Date();

let currentTime = document.querySelector("#currentTime");

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
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day}, ${month} ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response.data.main.temp);
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = response.data.name;
  let temperature = document.querySelector("#current-Temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);

}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  let apiKey = "53d7bee49bd42f64c132203ca5f41dd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "53d7bee49bd42f64c132203ca5f41dd2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#weatherSearch");
form.addEventListener("submit", submitCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showLocation);
