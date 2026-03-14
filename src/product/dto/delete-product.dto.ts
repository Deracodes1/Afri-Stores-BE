import { IsNotEmpty, IsUUID } from 'class-validator';
export class DeleteProductDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
