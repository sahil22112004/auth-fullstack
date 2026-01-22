import { IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString({message:'enter only string'})
  name:string
}
