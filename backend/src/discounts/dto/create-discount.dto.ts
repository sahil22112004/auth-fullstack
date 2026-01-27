import { IsNotEmpty, IsString } from "class-validator";

export class CreateDiscountDto {

      @IsString()
      @IsNotEmpty()
      discountName: string;
    
      @IsString()
      @IsNotEmpty()
      discountPercentage: string;

}
