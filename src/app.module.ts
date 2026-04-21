import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './common/middleware/auth/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ProductModule,
    // loading the .env file and making it available globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // connecting to postgres sql with typeorm
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true, //this finds my entities automatically in ts so i don't list em manaually
        synchronize: true, // only in development. will remove in production
      }),
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'product/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'product',
        method: RequestMethod.POST,
      },
      {
        path: 'product/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'users',
        method: RequestMethod.GET,
      },
    );
  }
}
