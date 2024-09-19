import React, { useState, useEffect } from 'react';
import './WeatherApp.css';  

const WeatherApp = () => {
  const [city, setCity] = useState('');      
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(null); 

  const fetchWeather = async () => {
    try {
      const API_KEY = '54904eb379f1b9ffbea14af4496409af'; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      setError(null);  
    } catch (err) {
      setWeather(null);
      setError(err.message);  
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchWeather} className="weather-button">
          Get Weather
        </button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WeatherApp;
