
const getWeatherBtn = document.getElementById("get-weather-btn");
const selectCity = document.getElementById("select-city");

const weatherIcon = document.getElementById("weather-icon");
const mainTemperature = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationDisplay = document.getElementById("location");

getWeatherBtn.addEventListener("click", () => {
  const city = selectCity.value;
  if (city === "") {
    return;
  }
  showWeather(city);
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  const validate = (value) => (value === undefined ? "N/A" : value);

  locationDisplay.innerText = validate(data.name);
  mainTemperature.innerText = validate(data.main?.temp);
  feelsLike.innerText = validate(data.main?.feels_like);
  humidity.innerText = validate(data.main?.humidity);
  wind.innerText = validate(data.wind?.speed);
  windGust.innerText = validate(data.wind?.gust);
  weatherMain.innerText = validate(data.weather?.[0]?.main);

  if (data.weather?.[0]?.icon) {
    weatherIcon.src = data.weather[0].icon;
    weatherIcon.alt = data.weather[0].description;
  }

  document.getElementById("weather-info").hidden = false;
}

