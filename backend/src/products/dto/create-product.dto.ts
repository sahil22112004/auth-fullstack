import { IsString, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  price: string;

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
  @IsString()
  photoUrl?: any[];
}
