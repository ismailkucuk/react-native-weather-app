import axios from 'axios';
import { apiKey } from '../constants';

const forecastEndpoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = params=> `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}&aqi=no`;

const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint,
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}

export const fetchLocations = params => {
    return apiCall(locationsEndpoint(params));
}

