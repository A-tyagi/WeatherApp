const OpenApi = {
    key: "812b3f4f41b55428a9fd785f632a7f4d",
    base: "https://api.openweathermap.org/data/2.5/"
}
const UnlockApi = {
    appId: "bc5971c7",
    key: "f517a861235cdbf45e8ff96d3da6fbdf",
    base: "https://api.weatherunlocked.com/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getOpenResults(searchbox.value);
    }
}

function getOpenResults(query) {
    fetch(`${OpenApi.base}weather?q=${query}&units=imperial&APPID=${OpenApi.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayOpenResults);
}

function getOpenFiveDayResults(query) {
    fetch(`${OpenApi.base}forecast?q=${query}&units=imperial&appid=${OpenApi.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayOpenResults);
}

function displayOpenResults(weather) {
    let city = document.querySelector('.date-container p');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date-container .date-dayname');
    date.innerText = dayBuilder(now);

    let date2 = document.querySelector('.date-container .date-day');
    date2.innerText = dateBuilder(now);

    let temp = document.querySelector('.weather-temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.weather-desc');
    weather_el.innerText = weather.weather[0].main;

    let precip = document.querySelector('.precipitation p');
    precip.innerText =  weather.main.pressure + ' mb';

    let humidity = document.querySelector('.humidity p');
    humidity.innerText =  weather.main.humidity + ' %';

    let wind = document.querySelector('.wind p');
    wind.innerText =  weather.wind.speed + ' mph';

    document.getElementById("locImage").style.backgroundImage = "url('https://i.gifer.com/OKaX.gif')";
}


function dayBuilder(d) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];

    return `${day}`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`;
}
