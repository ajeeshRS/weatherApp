const apiKey = "110b8d6bd65d8fa98e114b3452ee3282";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const city_name = document.querySelector(".city_name");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".hum");
const wind = document.querySelector(".speed");
const input = document.getElementById("searchBox");
const searchBtn = document.getElementById("search-button");
const weatherIcon = document.getElementById("weather-icon");
const interface = document.querySelector(".interface");

const errMsg = "City not found !";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  if (response.status === 404) {
    city_name.textContent = errMsg;
  } 
  else {
    city_name.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°c";
    humidity.textContent = data.main.humidity + " %";
    wind.textContent = data.wind.speed + " km/h";
  }
  
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "img/clouds.png";
    interface.style.background = "linear-gradient(#d1da21, #e9ae0c)";
  }
   else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "img/clear.png";
    interface.style.background = "linear-gradient(#d46119, #c0231b)";
  } 
  else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "img/rain.png";
    interface.style.background = "linear-gradient(#0d5c70, #2999b3)";
  } 
  else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } 
  else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "img/snow.png";
  } 
  else {
    weatherIcon.src = "img/mist.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(input.value);

  input.value = "";
  city_name.textContent = "";
  temp.textContent = "";
  humidity.textContent = "";
  wind.textContent = "";
  interface.style.background = "linear-gradient(blue, #4659b8)";
});
