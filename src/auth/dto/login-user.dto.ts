import { PartialType } from '@nestjs/mapped-types';
import { registerDto } from './register.dto';

export class loginDto extends PartialType(registerDto) {}
