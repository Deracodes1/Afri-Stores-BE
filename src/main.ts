import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away fields that aren't in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra fields are sent
      transform: true, // Automatically transforms payloads to match DTO types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

// ✅ Fix: Handle the rejection
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
