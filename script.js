const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const weatherWrapper = document.querySelector('.weatherWrapper')

const apiKey = '5aaf6db6f502600a4feb9149d9d44f6c';

weatherForm.addEventListener('submit', async event => {

    event.preventDefault()

    const city = cityInput.value;

    if(city) {
        try{
             const weatherData =await getWeatherData(city);
             displayWeatherInfo(weatherData);
        }
        catch(error) {
            console.log(error);
            displayError(error)
        }
    } else {
        displayError("Please write a city");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error('Could not fetch weather data');
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const{name: city, 
        main: {temp, humidity}, 
        weather:[{description, id}]} = data;  
    
    weatherWrapper.textContent = ""
    weatherWrapper.style.display = "flex"

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p')

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°`;
    humidityDisplay.textContent = `Humidity: ${humidity}%   `
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityName');
    tempDisplay.classList.add('cityTemp')
    humidityDisplay.classList.add('cityHumidity')
    descDisplay.classList.add('cityDesc')
    weatherEmoji.classList.add('cityEmoji')

    weatherWrapper.appendChild(cityDisplay);
    weatherWrapper.appendChild(tempDisplay);
    weatherWrapper.appendChild(humidityDisplay);
    weatherWrapper.appendChild(descDisplay);
    weatherWrapper.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    switch(true) {
        case(weatherId >= 200 && weatherId < 300):
        return '⛈️';
        case(weatherId >= 300 && weatherId < 400):
        return '🌧️';
        case(weatherId >= 500 && weatherId < 600):
        return '🌧️';
        case(weatherId >= 600 && weatherId < 700):
        return '❄️';
        case(weatherId >= 700 && weatherId < 800):
        return '🌫️';
        case(weatherId === 800):
        return '☀️';
        case(weatherId >= 801 && weatherId < 810):
        return '☁️';    
        default:
            return '';
    }
}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message
    errorDisplay.classList.add('.cityError')

    weatherWrapper.textContent = '';
    weatherWrapper.style.display = 'flex'
    weatherWrapper.appendChild(errorDisplay)
}