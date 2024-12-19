import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather') // Création de route /weather
export class WeatherController {
  constructor(private weatherService: WeatherService) {} // Injection de WeatherService
  private cache = {};

  @Get(':city') // Route /weather/:city
  async getWeatherByCity(@Param('city') city: string) {
    city = city.toLowerCase();
    if (
      this.cache[city] &&
      this.cache[city].timestamp &&
      Date.now() - this.cache[city].timestamp < 60000
    ) {
      return this.cache[city].datas;
    }
    const weather = await this.weatherService.getWeatherByCity(city);
    this.cache[city] = { datas: weather, timestamp: Date.now() };
    return weather;
  }
}
