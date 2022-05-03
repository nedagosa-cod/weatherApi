// IDS DE HTML
const inputSearch = document.getElementById('search');
const buttonSearch = document.getElementById('bSearch');
const mainForm = document.getElementById('mainForm');
const boxCity = document.getElementById('city');
const temperature = document.getElementById('temp');
const cloud = document.getElementById('cloud');
const hum = document.getElementById('humidity');
const speed = document.getElementById('speed');

const baseUrl = 'api.openweathermap.org'
const key = 'b52d8ff316ffedb5ca3dd4d1969f104b';


const getCity = (city) => {
    city = city.toLowerCase();
    getWeather(`http://${baseUrl}/data/2.5/weather?q=${city}&appid=${key}`);
}

const getCityStart = async () => {
    try {

        const request = await fetch("https://ipinfo.io/json?token=d97340bdb6c419")
        const data = await request.json();
        const city = data.city.toLowerCase();
        boxCity.innerHTML += data.city
        getWeather(`http://${baseUrl}/data/2.5/weather?q=${city}&appid=${key}`);
    } catch (error) {
        console.log(error);
    }
}

const getWeather = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    const {name} = data;
    const {description, icon} = data.weather[0];
    const {temp, humidity} = data.main;
    try {
        console.log(data);
        if (data.cod === 200) {
            boxCity.innerHTML = `Weather in ${name}`;
            temperature.innerHTML = 
                `${Math.round(temp - 273.15)}°C 
                <figure class="temperature">
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">
                </figure>`;
            cloud.innerHTML = `${description}`;
            hum.innerHTML = `Humidity: ${humidity}%`;
            speed.innerHTML = `Windy Speed ${data.wind.speed} m/s`;
            inputSearch.value = '';
        } else if (data.cod === 404) {
            console.log('No se encontró la ciudad');
        }
        
    } catch (error) {
        console.log(error);
    }
}

// Event Listeners
mainForm.addEventListener('submit', (e) => {e.preventDefault();getCity(inputSearch.value)});
buttonSearch.addEventListener('click', (e) => {e.preventDefault();getCity(inputSearch.value)});
getCityStart();