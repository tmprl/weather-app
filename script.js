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
    
}

function getWeatherEmoji(weatherId) {

}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message
    errorDisplay.classList.add('.cityError')

    weatherWrapper.textContent = '';
    weatherWrapper.style.display = 'flex'
    weatherWrapper.appendChild(errorDisplay)
}