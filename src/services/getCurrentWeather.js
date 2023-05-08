import axios from "axios";
import { kelvinToCelsius } from "../utils/kelvinToCelsius.js";
import { kelvinToFarenheit } from "../utils/kelvinToFarenheit.js";
import { getIconById } from "../utils/getIconById.js";
export const getCurrentWeather = async (lat, lon) => {
    try {
        const params = {
             lat,
             lon,
             appid: "4b97c489a4dfeb8f9377f377d50fedcf"
        };
        const res = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params
            }
        );
        const weatherInfo = {
            country: res.data.sys.country,
            city: res.data.name,
            weather: {
                main: res.data.weather[0].main,
                description: res.data.weather[0].description,
                icon: getIconById(res.data.weather[0].icon),
                humidity: res.data.main.humidity,
                windSpeed: res.data.wind.speed,
                pressure: res.data.main.pressure
            },
            temperature: {
                kelvin: res.data.main.temp,
                celsius: kelvinToCelsius(res.data.main.temp),
                farenheit: kelvinToFarenheit(res.data.main.temp),
            }
        };
        //*console.log(res.data)
        return weatherInfo;
    } catch (error) {
        console.error(error)
    }
}