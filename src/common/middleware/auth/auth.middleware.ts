import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString();
    // Logging the method, URL, and timestamp
    console.log(`[${now}] Request: ${req.method} ${req.originalUrl}`);

    //  pass the request along; the Guard will handle the token check
    next();
  }
}
