import { IsString, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumberString()
  @IsNotEmpty()
  userId: string;

  @IsNumberString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  description: string;


  @IsOptional()
  photoUrl?: string[];
}
