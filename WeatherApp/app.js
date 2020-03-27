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
        getOpenFiveDayResults(searchbox.value) 
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
        }).then(displayFiveDayResults);
}

function displayOpenResults(weather) {
    let city = document.querySelector('.date-container p');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date-container .date-dayname');
    date.innerText = dayBuilder(now);

    if(date.innerText == 'Monday'){
        document.getElementById("day1").innerText = 'Tue'
        document.getElementById("day2").innerText = 'Wed'
        document.getElementById("day3").innerText = 'Thu'
        document.getElementById("day4").innerText = 'Fri'
        document.getElementById("day5").innerText = 'Sat'
    } else if(date.innerText == 'Tuesday'){
        document.getElementById("day1").innerText = 'Wed'
        document.getElementById("day2").innerText = 'Thu'
        document.getElementById("day3").innerText = 'Fri'
        document.getElementById("day4").innerText = 'Sat'
        document.getElementById("day5").innerText = 'Sun'
    } else if(date.innerText == 'Wednesday'){
        document.getElementById("day1").innerText = 'Thu'
        document.getElementById("day2").innerText = 'Fri'
        document.getElementById("day3").innerText = 'Sat'
        document.getElementById("day4").innerText = 'Sun'
        document.getElementById("day5").innerText = 'Mon'
    } else if(date.innerText == 'Thursday'){
        document.getElementById("day1").innerText = 'Fri'
        document.getElementById("day2").innerText = 'Sat'
        document.getElementById("day3").innerText = 'Sun'
        document.getElementById("day4").innerText = 'Mon'
        document.getElementById("day5").innerText = 'Tue'
    } else if(date.innerText == 'Friday'){
        document.getElementById("day1").innerText = 'Sat'
        document.getElementById("day2").innerText = 'Sun'
        document.getElementById("day3").innerText = 'Mon'
        document.getElementById("day4").innerText = 'Tue'
        document.getElementById("day5").innerText = 'Wed'
    } else if(date.innerText == 'Saturday'){
        document.getElementById("day1").innerText = 'Sun'
        document.getElementById("day2").innerText = 'Mon'
        document.getElementById("day3").innerText = 'Tue'
        document.getElementById("day4").innerText = 'Wed'
        document.getElementById("day5").innerText = 'Thu'
    } else {
        document.getElementById("day1").innerText = 'Mon'
        document.getElementById("day2").innerText = 'Tue'
        document.getElementById("day3").innerText = 'Wed'
        document.getElementById("day4").innerText = 'Thu'
        document.getElementById("day5").innerText = 'Fri'
    }

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

    if(weather.weather[0].main == "Clear"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/day.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://s5.gifyu.com/images/ezgif.com-gif-makerdd801017cb0360f9.gif')";
    } else if(weather.weather[0].main == "Clouds"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/cloudy.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://s5.gifyu.com/images/ezgif.com-gif-makerdd801017cb0360f9.gif')";
    } else if(weather.weather[0].main == "Mist"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/cloudy.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://i.pinimg.com/originals/95/dc/a4/95dca49148e94615e9cd389e2d69f6e9.gif')";
    } else if(weather.weather[0].main == "Haze"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/cloudy.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://i.pinimg.com/originals/95/dc/a4/95dca49148e94615e9cd389e2d69f6e9.gif')";
    } else if(weather.weather[0].main == "Fog"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/cloudy.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://i.pinimg.com/originals/95/dc/a4/95dca49148e94615e9cd389e2d69f6e9.gif')";
    } else if(weather.weather[0].main == "Rain"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/rainy-6.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://i.gifer.com/OKaX.gif')"; 
    }  else if(weather.weather[0].main == "Drizzle"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/rainy-6.svg"/>`;
        document.getElementById("locImage").style.backgroundImage = "url('https://i.gifer.com/OKaX.gif')";
    } else if(weather.weather[0].main == "Snow"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/snowy-6.svg"/>`;
    } else if(weather.weather[0].main == "Thunderstorm"){
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/thunder.svg"/>`;
    } else {
        document.querySelector(".weather-icon").innerHTML = `<img src="icons/day.svg"/>`;
    }

   
}

function displayFiveDayResults(weather) {
    
    let forecast1 = document.getElementById("temp1");
    forecast1.innerText =  `${Math.round(weather.list[7].main.temp)}°F`;

    let forecast2 = document.getElementById("temp2");
    forecast2.innerText =  `${Math.round(weather.list[15].main.temp)}°F`;

    let forecast3 = document.getElementById("temp3");
    forecast3.innerText =  `${Math.round(weather.list[23].main.temp)}°F`;

    let forecast4 = document.getElementById("temp4");
    forecast4.innerText =  `${Math.round(weather.list[31].main.temp)}°F`;

    let forecast5 = document.getElementById("temp5");
    forecast5.innerText =  `${Math.round(weather.list[39].main.temp)}°F`;

    document.getElementById("WthrImg1").innerHTML =`<img src="icons/${weather.list[7].weather[0].icon}.png"/>`;
    document.getElementById("WthrImg2").innerHTML =`<img src="icons/${weather.list[15].weather[0].icon}.png"/>`
    document.getElementById("WthrImg3").innerHTML =`<img src="icons/${weather.list[23].weather[0].icon}.png"/>`
    document.getElementById("WthrImg4").innerHTML =`<img src="icons/${weather.list[31].weather[0].icon}.png"/>`
    document.getElementById("WthrImg5").innerHTML =`<img src="icons/${weather.list[39].weather[0].icon}.png"/>`
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
