import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private connection: Connection,
  ) {}

  @Get()
  getApiInfo() {
    return this.appService.getApiInfo();
  }

  @Get('test-db') // Test pour mongodb
  async testDatabase() {
    try {
      const isConnected = this.connection.readyState === 1;

      return {
        status: 'success',
        connected: isConnected,
        message: isConnected ? 'Connexion à MongoDB réussie !' : 'Non connecté à MongoDB',
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
