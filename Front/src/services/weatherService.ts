import axios from "axios";
import { API_CONFIG } from "../config/api.config";
import { WeatherData } from "../types/weather";

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEATHER}/${city}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
