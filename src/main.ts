import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });
  await app.listen(process.env.PORT || 3000);
  console.log("conexion a la base de datos exitosa");
  console.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap();
