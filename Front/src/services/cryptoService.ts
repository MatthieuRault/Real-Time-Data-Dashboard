import axios from "axios";
import { API_CONFIG } from "../config/api.config.ts";
import { Crypto, CryptoDetails } from "../types/crypto";

export const getCryptoList = async (): Promise<Crypto[]> => {
  try {
    const response = await axios.get<Crypto[]>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CRYPTO}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch cryptocurrencies data");
  }
};

export const getCryptoById = async (id: string): Promise<CryptoDetails> => {
  try {
    const response = await axios.get<CryptoDetails>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CRYPTO}/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch cryptocurrency data");
  }
};
