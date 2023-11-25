let longitudeGeo;
let latitudeGeo;
let cityGeo;

// API DOWNLOAD GEOLOCATION (from IP)
Geo = () => {
  fetch("https://ipapi.co/json/")
    .then((geo) => {
      if (geo.status !== 200) throw Error("Hmmm, something is wrong with json!");
      else return geo.json();
    })
    .then((geo) => {
      longitudeGeo = geo.longitude;
      latitudeGeo = geo.latitude;
      cityGeo = geo.city;
      Weather();
    })
    .catch((err) => alert(err, "Hmmm, something is wrong with Geolocation!"));
};

// API DOWNLOAD WEATHER
Weather = () => {
  const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitudeGeo}&longitude=${longitudeGeo}&hourly=temperature_2m,cloudcover,windspeed_80m,temperature_180m&models=gfs_global&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin`;

  fetch(urlWeather)
    .then((climate) => {
      if (climate.status !== 200) throw Error("Hmmm, something is wrong!");
      else return climate.json(); // parse from url to object
    })
    .then((climate) => showWeather(climate))
    .catch((err) => alert(err, "Hmmm, something is wrong with this weather!"));
};

// SHOW RESULTS in DOM
showWeather = (climate) => {
  const resultArea = document.querySelector(".weather__grid");

  // add city + date
  const city = document.createElement("div");
  const temp = [...climate.hourly.temperature_2m];
  city.textContent = `${cityGeo} (Your location), update ${climate.current_weather.time}`;
  city.classList.add("city__my");
  resultArea.appendChild(city);

  // add temp.
  for (let i = 14; i < temp.length; i++) {
    const text = document.createElement("div");
    text.textContent = `${temp[i]}°C`;
    text.classList.add("t");
    resultArea.appendChild(text);
  }

  // add wind
  const wind = [...climate.hourly.windspeed_80m];
  for (let i = 14; i < wind.length; i++) {
    const text = document.createElement("div");
    text.textContent = `${wind[i]} km/h`;
    text.classList.add("w");
    resultArea.appendChild(text);
  }

  // add cloud
  const cloud = [...climate.hourly.cloudcover];
  for (let i = 14; i < cloud.length; i++) {
    const text = document.createElement("div");
    text.textContent = `${cloud[i]} %`;
    text.classList.add("c");
    resultArea.appendChild(text);
  }
};

showCoffee = () => {
  const img = document.createElement("img");
  img.src = `https://coffee.alexflipnote.dev/random`;
  document.querySelector(".coffee__show").appendChild(img);
};

showCat = (cat) => {
  const img = document.createElement("img");
  img.src = `https://cataas.com/cat`;
  document.querySelector(".cats__show").appendChild(img);
};

Geo();
showCoffee();
showCat();

// FUTURE
//
// API WITH LONG WEEKENDS (maybe future)
// const Weekends = () => {
//   const urlWeekends = "https://date.nager.at/api/v3/PublicHolidays/2023/PL";
//   fetch(urlweekends)
//     .then((days) => {
//       return days.json();
//     })
//     .then((days) => showWeekends(days));
// };

// const showWeekends = (days) => {
//   const resultArea = document.querySelector(".weekends__show");
//   const weekends = document.createElement("div");
//   resultArea.appendChild(img);
// };
