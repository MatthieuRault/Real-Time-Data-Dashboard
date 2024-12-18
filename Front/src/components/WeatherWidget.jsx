import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherService";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Paris");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherByCity(city);
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-bold mb-2">Météo</h2>
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
          Entrer un nom de ville :
        </label>
        <input
          type="text"
          id="city"
          className="border rounded px-2 py-1"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">
          Voici la météo actuelle à {city}
        </h3>
        <p className="text-gray-600">Temperature: {weatherData.main.temp}°C</p>
        <p className="text-gray-600">Humidité: {weatherData.main.humidity}%</p>
        <p className="text-gray-600">Vent: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
