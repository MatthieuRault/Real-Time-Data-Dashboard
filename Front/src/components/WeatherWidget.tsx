import { FC, useState } from "react";
import { getWeatherByCity } from "../services/weatherService";
import { WeatherData } from "../types/weather.d";

export const WeatherWidget: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setWeatherData(null);
      return;
    }

    try {
      setError(null); // Réinitialiser l'erreur
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météo :",
        error
      );
      setError("Impossible de récupérer les données météo pour cette ville.");
      setWeatherData(null);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
          Choisissez une ville :
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="city"
            className="border rounded px-2 py-1 w-full"
            placeholder="Entrez votre ville ici..."
            value={city}
            onChange={handleCityChange}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Rechercher
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {weatherData ? (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Température</h3>
            <p className="text-gray-600">{weatherData.main.temp}°C</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Humidité</h3>
            <p className="text-gray-600">{weatherData.main.humidity}%</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Vent</h3>
            <p className="text-gray-600">{weatherData.wind.speed} m/s</p>
          </div>
        </div>
      ) : city.trim() && !error ? (
        <p className="text-gray-500">Chargement des données météo...</p>
      ) : (
        <p className="text-gray-500">Entrez une ville pour voir la météo.</p>
      )}
    </div>
  );
};

export default WeatherWidget;
