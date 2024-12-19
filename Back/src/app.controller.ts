import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Création de la route /api principale
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiInfo() {
    return this.appService.getApiInfo();
  }
}
