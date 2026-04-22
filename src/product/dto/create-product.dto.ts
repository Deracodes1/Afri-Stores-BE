import { IsString, IsNumber, Min, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsUUID() // Ensures the frontend sends a valid UUID format
  categoryId!: string;
}
