import { IsString, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateProductDto {

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

  @IsString()
  @IsNotEmpty()
  photoUrl: string;
}
