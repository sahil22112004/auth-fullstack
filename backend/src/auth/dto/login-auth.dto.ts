import {  IsString, IsEmail,IsNotEmpty } from 'class-validator';


export class LoginAuthDto {

    @IsString({message:'enter only string'})
    @IsEmail()
    @IsNotEmpty({message:'this field cannot be emty'})
    email:string

    @IsString({message:'thiss'})
    @IsNotEmpty({message:'thiss'})
    password:string


}

