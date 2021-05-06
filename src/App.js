//import './App.css';
import React, { useState } from 'react';

//Weather API 
const api = {
  key: "ded4c73e569a930bb65b08009da76e7a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  //weather api call
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }


  //function to return today's date
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()]; //gets day from array above
    let date = d.getDate(); 
    let month = months[d.getMonth()]; //gets month from array above, a number 0-11 for month
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`

  }

  return (
    <div className={
      (typeof weather.main != "undefined")
       ? ((weather.main.temp > 70)
        ? 'app warm' 
        : 'app')
      : 'app'}>
      <main> 
          <div className="search-box">
            <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°F</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>  
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
