import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // making the validators and transformers available globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away fields that aren't in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra fields are sent
      transform: true, // Automatically transforms payloads to match DTO types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

// Fix: Handle the rejection of the app bootstrap
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});

// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
//  above is a helper command i will run in terminal to generate a random crypto string as my
// secret key

//CREATE DATABASE project_name;
//  this is for creating a new db in pgadmin
