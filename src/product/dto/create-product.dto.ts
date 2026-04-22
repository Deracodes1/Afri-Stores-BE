import {
  IsString,
  IsNumber,
  Min,
  IsUUID,
  IsOptional,
  IsUrl,
} from 'class-validator';

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

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  @IsString()
  @IsUrl() // to force valid URL formats
  image?: string;
}
