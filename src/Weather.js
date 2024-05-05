import React, { useState } from "react";
import axios from "axios";

import "./Weather.css";

export default function SearchWeather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [loaded, setLoaded] = useState(false);

  function showClimateValues(response) {
    setLoaded(true);
    setWeather({
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showClimateValues);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="search-city" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="How is the weather in..."
        className="input-city"
        onChange={updateCity}
      />
      <button type="Submit" className="search-city-button">
        Search{" "}
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <div className="climate">
          <h1>{weather.name}</h1>
          <img src={weather.icon} alt="Sunny" className="icon" />
          <h2 className="temperature">
            {Math.round(weather.temperature)}
            <span className="units">°C</span>
          </h2>

          <ul className="climate-values">
            <li>Humidity: {weather.humidity} %</li>
            <li>Wind speed: {Math.round(weather.wind)} km/h</li>
            <li>{weather.description}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
