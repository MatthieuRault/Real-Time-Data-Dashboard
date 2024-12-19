import axios from "axios";
import { API_CONFIG } from "../config/api.config.ts";

export const getCryptoList = async () => {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CRYPTO}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch cryptocurrencies data");
  }
};

export const getCryptoById = async (id) => {
  try {
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CRYPTO}/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch cryptocurrency data");
  }
};
