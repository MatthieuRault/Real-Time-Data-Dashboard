import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer le CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET',
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
