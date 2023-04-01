// API POBIERAJĄCE POGODĘ
const Weather = () => {
  const urlWeather =
    "https://api.open-meteo.com/v1/forecast?latitude=50.15&longitude=18.84&hourly=temperature_2m,cloudcover,windspeed_80m,temperature_180m&models=gfs_global&current_weather=true&forecast_days=3&timezone=Europe%2FBerlin";
  // Podstawowa! budowa metody fetch()
  fetch(urlWeather)
    .then((response) => {
      if (response.status !== 200) {
        throw Error("To nie jest odp. 200");
      } else {
        return response.json(); // parsuje tzn. zamienia wyniki z url na obiekt JS
      }
    })
    // .then((json) => console.log(json))
    .catch((err) => alert(err, "coś z Pogodą jest nie tak!"));
};

const Coffee = () => {
  const urlCoffee = "https://coffee.alexflipnote.dev/random.json";
  fetch(urlCoffee)
    .then((cup) => {
      return cup.json();
    })
    .then((cup) => showCoffee(cup));
};

// API POBIERAJĄCE KOTA
const Cats = () => {
  const urlCats = "https://cataas.com/cat?json=true";
  fetch(urlCats)
    .then((cats) => {
      if (cats.status !== 200) {
        throw Error("Nie pobiera kotów!!!");
      } else {
        return cats.json();
      }
    })
    // .then((cat) => console.log(cat))
    .then((cat) => showCat(cat.url))
    .catch(Error("coś z Kotami jest nie tak!"));
};

// WYŚWIETL WYNIKI w DOM
const showWeather = () => {};
const showCoffee = (cup) => {
  const resultArea = document.querySelector(".coffee__show");
  const img = document.createElement("img");
  // img.src = `https://cataas.com${cat}`;
  console.log(cup);
  resultArea.appendChild(img);
};
const showCat = (cat) => {
  const resultArea = document.querySelector(".cats__show");
  const img = document.createElement("img");
  img.src = `https://cataas.com${cat}`;
  resultArea.appendChild(img);
};

Weather();
Coffee();
Cats();
