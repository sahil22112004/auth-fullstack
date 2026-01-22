import {  IsString, IsEmail,IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';


export class CreateProductDto {

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    productName:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    category:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    subcategory:string

    // @IsString({message:'enter only string'})
    // @IsNotEmpty({message:'this field cannot be emty'})
    // product_id:string

    @IsNumber()
    @IsNotEmpty({message:'this field cannot be emty'})
    price:number

    @IsNumberString()
    @IsNotEmpty({message:'this field cannot be emty'})
    userId:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    description:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    photoUrl:string

}
