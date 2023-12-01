import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter/global-exception.filter';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.API_PORT || 3030);
}
bootstrap();
