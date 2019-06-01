import React from 'react';
import Icon from './Icon';

const API_WEATHER = 'http://localhost:8080/weather-crawler/current-weathers/by-city-name';
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class TodayWeather extends React.Component {
  state = {
    weather: null
  };

  async componentDidMount() {
    const { cityId } = this.props.match.params;
    // const cityId = 'Daejeon';
    const api = `${API_WEATHER}/${cityId}`;

    const weather = await fetch(api)
      .then(res => res.json())
      .then(data => data);

    this.setState({
      weather
    });
  }

  render() {
    const { cityId } = this.props.match.params;
    const { weather } = this.state;

    if (!weather) {
      return <div>Loading...</div>;
    }

    const celsius = (weather.main.temp - 273.15).toFixed(2); // kelvin to celsius
    const weatherMain = weather.weather[0].main;
    const weatherIcon = weather.weather[0].icon;
    const weatherCountry = weather.sys.country;
    const weatherMains = weather.main;
    const weatherWind = weather.wind;

    return (
      <div className="weather-today">
        <h2 className="weather-city">Weather in {cityId}, {weatherCountry}</h2>

        <div className="weather-today-meta">
          <h3 className="weather-main">{weatherMain}</h3>
          <div className="weather-image">
            <Icon iconId={weatherIcon} />
          </div>
          <div className="weather-temp">{celsius}°C</div>
        </div>

        <table className="weather-table">
          <tr>
            <th>Wind</th>
            <td>{weatherWind.speed} m/s</td>
          </tr>
          <tr>
            <th>Pressure</th>
            <td>{weatherMains.pressure} hpa</td>
          </tr>
          <tr>
            <th>Humidity</th>
            <td>{weatherMains.humidity} %</td>
          </tr>
        </table>
        
      </div>
    );
  }
}

export default TodayWeather;
