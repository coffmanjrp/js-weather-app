const locationName = document.querySelector('.location__name');
const locationIcon = document.querySelector('.location__icon');
const tempDesc = document.querySelector('.temperature__description');
const tempDegree = document.querySelector('.temperature__degree');
const tempDegreeValue = document.querySelector('.temperature__degree-value');
const tempSpan = document.querySelector('.temperature__degree span');

// OpenWeather API
// https://openweathermap.org/
// Set your api key to apiKey variable
const apiKey = API_KEY;
const kelvin = 273.15;

async function fetchApi(api) {
  const res = await fetch(api);
  const data = await res.json();

  return data;
}

navigator.geolocation.getCurrentPosition(async (position) => {
  const long = position.coords.longitude;
  const lat = position.coords.latitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`;

  const data = await fetchApi(apiUrl);

  const { name } = data;
  const { temp } = data.main;
  const { country } = data.sys;
  const { description, icon } = data.weather[0];

  tempDegreeValue.innerText = Math.floor(temp - kelvin);
  tempDesc.innerText = description;
  locationName.innerText = `${name}, ${country}`;
  locationIcon.innerHTML = `<img src="icons/${icon}.png" alt="${description}" />`;

  function changeTemperatureUnit() {
    if (tempSpan.innerText === '˚C') {
      tempSpan.innerText = '˚F';
      tempDegreeValue.innerText = Math.floor(((temp - kelvin) * 9) / 5 + 32);
    } else {
      tempSpan.innerText = '˚C';
      tempDegreeValue.innerText = Math.floor(temp - kelvin);
    }
  }

  tempDegree.addEventListener('click', changeTemperatureUnit);
});
