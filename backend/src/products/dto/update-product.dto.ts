import { IsString, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class UpdateProductDto {

  @IsString()
@IsOptional()  productName: string;

  @IsString()
@IsOptional()  price: string;

  @IsString()
@IsOptional()  stock: string;

  @IsNumberString()
@IsOptional()  userId: string;

  @IsNumberString()
@IsOptional()  categoryId: string;

  @IsString()
  @IsOptional()
  description: string;


  @IsOptional()
  photoUrl?: string[];
}
