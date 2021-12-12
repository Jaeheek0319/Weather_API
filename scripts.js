const APIkey = "2dc943f244eb087af8a375a0c6dcbae2";
const search = document.querySelector(".search")
const weather = document.querySelector(".data")
const forecast = document.querySelector(".forecast")

search.addEventListener("click", (event) => {
  const cityName = document.querySelector(".location").value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=imperial`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("data: ", data);
      // code goes here
      weather.innerHTML = `
          ${new Date().toLocaleDateString()}
          <div class="info">
          <p class="area">${data.name}</p>
          <p>Maximum temperature of ${data.main.temp_max}</p>
          <p>Minimum temperature of ${data.main.temp_min}</p>
          <p>Humidity of ${data.main.humidity}%</p>
          <p>Wind speed of ${data.wind.speed} MPH/H </p>
          <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
          </div>
         `
    })

  //write forecast fetch
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`)
    .then((res) => {
      return res.json();
    }).then((data) => {
      console.log("forecast: ", data);
      const filtered = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

      let template = "";

      filtered.forEach((item) => {
        template += `
          ${new Date().toLocaleDateString()}
          <div class="info">
          <p>Maximum temperature of ${item.main.temp_max}</p>
          <p>Minimum temperature of ${item.main.temp_min}</p>
          <p>Humidity of ${item.main.humidity}%</p>
          <p>Wind speed of ${item.wind.speed} MPH/H </p>
          <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png"/>
          </div>
         `
      });

      // code goes here
      forecast.innerHTML = template;
    })
});