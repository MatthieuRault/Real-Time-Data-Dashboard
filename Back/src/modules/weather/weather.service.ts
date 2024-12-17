import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable() // Indique que la classe peut être injectée en tant que dépendance
export class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
  }

  async getWeatherByCity(city: string): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric', // Unités en Celsius
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Unable to fetch weather data');
    }
  }
}
