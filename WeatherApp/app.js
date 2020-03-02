window.addEventListener('load', () => {
    let long;
    let lat;
    let location = document.querySelector('.date-container p');
    let weatherTemp = document.querySelector('.weather-temp');
    let weatherDesc = document.querySelector('.weather-desc');
    let precipitation = document.querySelector('.precipitation p');
    let humidity_ = document.querySelector('.humidity p');
    let wind = document.querySelector('.wind p');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/f47c59e976fba77e925927c227145462/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { timezone, temperature, summary, precipProbability, humidity, windSpeed } = data.currently;
                    location.textContent = timezone
                    weatherTemp.textContent = temperature + '°F';
                    weatherDesc.textContent = summary;
                    precipitation.textContent = precipProbability + ' %';
                    humidity_.textContent = humidity + ' %';
                    wind.textContent = windSpeed + ' MPH';


                })
        });
    } else {
        h1.textContent = "Please Enable GeoLocation!"
    }

});
