import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

// 1. Define the interface at the top of the file (outside the class)

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const authHeader = request.headers?.['authorization'] as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authentication token missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
