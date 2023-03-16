import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: ['http://localhost:5173', 'https://url-shortener-nc.netlify.app'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
