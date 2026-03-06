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

@Module({
  imports: [ProductModule],
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
    );
  }
}
