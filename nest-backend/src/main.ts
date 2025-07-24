// main.ts - Fichier généré automatiquement
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Autoriser les requêtes venant de ton frontend Angular (exemple localhost:4200)
  app.enableCors({
    origin: 'http://localhost:4200', // ou '*' pour tout autoriser (pas recommandé en prod)
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();

