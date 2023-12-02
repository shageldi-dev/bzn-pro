import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    skipMissingProperties: true
  }));
  // app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors()
  await app.listen(process.env.API_PORT || 3030);
}
bootstrap();
