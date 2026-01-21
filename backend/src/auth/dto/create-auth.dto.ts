import {  IsString, IsEmail,IsNotEmpty } from 'class-validator';


export class CreateAuthDto {

    @IsString({message:'enter only string'})
    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    password:string

    @IsString({message:'enter only string'})
    @IsNotEmpty({message:'this field cannot be emty'})
    role:string


}

