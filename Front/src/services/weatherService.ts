import axios from "axios";

const weatherApi = axios.create({
  baseURL: "http://localhost:3000/weather",
});

export const getWeatherByCity = async (city) => {
  try {
    const response = await weatherApi.get(`/${city}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
