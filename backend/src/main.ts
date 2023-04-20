import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
=======

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
>>>>>>> 300108903604018ccfea2da1d6fc2c0867eeffd9
  app.enableCors();
  await app.listen(8090);
}
bootstrap();
