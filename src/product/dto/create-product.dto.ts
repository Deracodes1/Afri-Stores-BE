import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string; // ✅ The "!" tells TS to trust you

  @IsString()
  // @IsOptional()
  description!: string; // ✅ Use "?" if the field is optional

  @IsNumber()
  price!: number;
  @IsString()
  id!: string;
}
