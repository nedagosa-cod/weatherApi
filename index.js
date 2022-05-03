const baseUrl = 'api.openweathermap.org'
const key = 'b52d8ff316ffedb5ca3dd4d1969f104b';

const getCity = (city) => {
    city = city.toLowerCase();
    getWeather(`http://${baseUrl}/data/2.5/weather?q=${city}&appid=${key}`);
}

const getWeather = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}