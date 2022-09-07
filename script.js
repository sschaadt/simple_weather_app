let lat = 30;
let lon = -97;
let apiKey = "db36fc5e753af28498018311f5ad71e8";
let loc = "";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeather() {
  let form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    loc = document.getElementById("input").value;

    let apiLink = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apiKey}`;

    fetch(apiLink)
      .then((response) => {
        if(response.ok) return response.json();
        else throw new Error("Status code error: " + response.status + ", Please enter the name of a city.");
      })
      .then((data) => {
        const { main, name, sys, weather } = data;
        let currTempK = main.temp;
        let currTempF = Math.round((currTempK - 272.15) * 1.8 + 32);
        let currHum = main.humidity;
        let tag = weather[0].description;
        let weatherCode = weather[0].icon;
        let ul = document.getElementById("cities");
        let li = document.createElement("li");
        let temperature = document.createElement("p");
        temperature.setAttribute("id", "temperature");
        let humidity = document.createElement("p");
        humidity.setAttribute("id","humidity");
        let location = document.createElement("p");
        location.setAttribute("id", "location");
        let description = document.createElement("p");
        let icon = document.createElement("img");
        icon.setAttribute("class","icon");
        icon.src = `http://openweathermap.org/img/wn/${weatherCode}@2x.png`;
        description.setAttribute("id","description");
        temperature.appendChild(document.createTextNode(`${currTempF}\u00B0F`));
        humidity.appendChild(document.createTextNode(`Humidity: ${currHum}%`));
        location.appendChild(document.createTextNode(`${capitalizeFirstLetter(loc)}`));
        description.appendChild(document.createTextNode(`${capitalizeFirstLetter(tag)}`));
        li.appendChild(location);
        li.appendChild(icon);
        li.appendChild(temperature);
        li.appendChild(humidity);
        li.appendChild(description);
        ul.appendChild(li);
      })
      .catch(err => alert(err));
    document.getElementById("input").value = '';
  });
}

getWeather();
