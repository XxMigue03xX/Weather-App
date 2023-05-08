import { useEffect, useState } from 'react';
import { getCoordinates } from './services/getCoordinates.js';
import { getCurrentWeather } from "./services/getCurrentWeather.js"
import './App.css'
function App() {
  const [mode, setMode] = useState("day")
  const [weather, setWeather] = useState(null)
  const [isCelsius, setIsCelsius] = useState(true)
  useEffect(()=>{
    const loadWeather = async () => {
      const coordinates = await getCoordinates();
      if(coordinates){
        const weatherData = await getCurrentWeather(
          coordinates?.latitude,
          coordinates?.longitude
        );
        setWeather(weatherData)
      }else{
        //* Controlar el caso en el que el usuario no da permisos
        alert("Weather app can't work without location permissions")
      }
    }
    loadWeather();
  }, [])
  //* Funcion gestora del modo diurno y nocturno
  const switchMode = () => {
    if(mode==="day"){
      setMode("night")
    }else {
      setMode("day")
    }
  }
  return (
    <div className={`main_container ${mode==="day"?"main_day":"main_night"}`}>
      <h1 className='title'>Weather App</h1>
      <button className='mode_button' onClick={switchMode}></button>
        {weather ? (
          <>
          <article className={`weather_container ${mode==="day"?"cont_day":"cont_night"}`}>
            <p className={`temperature ${mode==="day"?"strong_day":"strong_night"}`}>{isCelsius
            ? weather.temperature.celsius.toFixed(1)
            : weather.temperature.farenheit.toFixed(1)}°{isCelsius ? "C" : "F"}
            </p>
            <div className='weather_icon'>
              <img
              src={weather.weather.icon}
              alt={weather.weather.description} />
            </div>
            <p className={`weather_main ${mode==="day"?"weak_day":"weak_night"}`}>Weather: {weather.weather.main}</p>
            <p className={`pressure ${mode==="day"?"weak_day":"weak_night"}`}>Pressure: {weather.weather.pressure} mb</p>
            <p className={`humidity ${mode==="day"?"weak_day":"weak_night"}`}>Humidity: {weather.weather.humidity} %</p>
            <p className={`wind_speed ${mode==="day"?"weak_day":"weak_night"}`}>Wind speed: {weather.weather.windSpeed} m/s</p>
            <p className={`city_country ${mode==="day"?"strong_day":"strong_night"}`}>
              {weather.city}, {weather.country}
            </p>
            <p className={`weather_description ${mode==="day"?"strong_day":"strong_night"}`}>{weather.weather.description}</p>
          </article>
          <button className={`change_button ${mode==="day"?"btn_day":"btn_night"}`} onClick={()=>{setIsCelsius(!isCelsius)}}>
            Change °{isCelsius ? "C" : "F"}
          </button>
          </>
          ) : (
            <div className='spinner'></div>
          )}
    </div>
  )
}
export default App;
