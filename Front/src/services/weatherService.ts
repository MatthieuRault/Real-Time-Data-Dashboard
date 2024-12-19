import axios from "axios";
import { API_CONFIG } from "../config/api.config.ts";

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEATHER}/${city}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
