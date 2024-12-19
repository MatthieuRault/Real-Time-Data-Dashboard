import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CryptoService {
  private readonly apiUrl = 'https://api.coingecko.com/api/v3';

  async getTopCryptos(limit: number = 10): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/coins/markets`, {
        params: {
          vs_currency: 'eur',
          order: 'market_cap_desc',
          per_page: limit, // Nombre de cryptomonnaies à afficher par page
          page: 1,
          sparkline: false,
        },
      });

      return response.data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        current_price: Math.round(coin.current_price * 100) / 100,
        market_cap: coin.market_cap,
        price_change_24h: Math.round(coin.price_change_percentage_24h * 100) / 100,
      }));
    } catch (error) {
      throw new Error('Unable to fetch cryptocurrencies data');
    }
  }

  async getCryptoById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/coins/${id}`);
      const coin = response.data;

      return {
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        current_price: {
          eur: coin.market_data.current_price.eur,
          usd: coin.market_data.current_price.usd,
        },
        market_cap: coin.market_data.market_cap.eur,
        price_change_24h: coin.market_data.price_change_percentage_24h,
        description: coin.description.fr || coin.description.en,
      };
    } catch (error) {
      throw new Error('Unable to fetch cryptocurrency data');
    }
  }
}
