import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
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

  // the specified forntend urls in the origin array will able to communiccate
  //  with my nest application
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true, //will enable the permitted frontend apps to send access toekn via authorization headers
  });

  // this will enable global versioning in our nest js application.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // to enable global prefix of /api before the version
  app.setGlobalPrefix('api');
  // this will enable graceful shutdown of the app(finish pending tasks before it does)
  // made it to run only during production cos it consumes a small amount of emmory
  if (process.env.NODE_ENV === 'production') {
    app.enableShutdownHooks();
  }

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

//  this is for creating a new db in pgadmin
//CREATE DATABASE project_name;
