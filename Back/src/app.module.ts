import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './modules/weather/weather.module';
import { CryptoModule } from './modules/crypto/crypto.module';

@Module({
  imports: [WeatherModule, CryptoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
