import { Controller, Get, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather') // Création de route /weather
export class WeatherController {
  constructor(private weatherService: WeatherService) {} // Injection de WeatherService

  @Get(':city') // Route /weather/:city
  async getWeatherByCity(@Param('city') city: string) {
    return this.weatherService.getWeatherByCity(city);
  }
}
