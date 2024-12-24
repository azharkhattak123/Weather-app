import React, { useEffect, useRef, useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import "./Weather.css";
import { toast } from "react-toastify";

const Weather = () => {
  const [weather, setWeather] = useState(false);
  const inputRef = useRef();
  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const handleSearch = async (city) => {
    if (city === "") {
      toast.error("Enter a city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_WEATHER_API
      }`;
      const response = await fetch(url);
      const weatherData = await response.json();
      if (!response.ok) {
        toast.error(weatherData.message);
        return;
      }
      console.log(weatherData);
      const icons = weatherIcons[weatherData.weather[0].icon] || clear_icon;
      setWeather({
        humidity: weatherData.main.humidity,
        temperature: Math.floor(weatherData.main.temp),
        location: weatherData.name,
        icons: icons,
        wind: weatherData.wind.speed,
      });
    } catch (error) {
      setWeather(false);
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    handleSearch("Islamabad");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => {
            handleSearch(inputRef.current.value);
          }}
        />
      </div>
      {weather ? (
        <>
          <img src={weather.icons} alt="" className="weather-icon" />
          <p className="temp">{weather.temperature}°c</p>
          <p className="location">{weather.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weather.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weather.wind} km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
