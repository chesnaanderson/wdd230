const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.88&lon=-111.88&appid=093427f70323ff470e315f773e308498';

async function apiFetch(url) {
    try{
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data)
            //console.log()
        } else {
            throw Error(await response.text());
        } 
    } catch (error) {
        console.log("API request failed");
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;f`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

apiFetch(url);