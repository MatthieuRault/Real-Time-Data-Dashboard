import { FC, useEffect, useState } from "react";
import { getWeatherByCity } from "../../../services/weatherService";
import { WeatherData } from "../../../types/weather.d";
import { WeatherWidgetProps } from "../../../types/props";

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherByCity(city);
        setWeatherData(data);
      } catch (err) {
        setError("Impossible de récupérer les données météo pour cette ville.");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (loading) {
    return <div className="text-center p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!weatherData) {
    return (
      <div className="text-gray-500 p-4">
        {city ? "Données météo non disponibles" : "Aucune ville sélectionnée"}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Météo à {weatherData.name}</h3>
      <div className="space-y-2">
        <div>
          <div className="text-lg font-semibold">Température</div>
          <p>{weatherData.main.temp}°C</p>
        </div>
        <div>
          <div className="text-lg font-semibold">Humidité</div>
          <p>{weatherData.main.humidity}%</p>
        </div>
        <div>
          <div className="text-lg font-semibold">Vent</div>
          <p>{weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
