import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAddressDto {
  
  @IsString()
  @IsNotEmpty({ message: 'userId cannot be empty' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'fullName cannot be empty' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'street cannot be empty' })
  street: string;

  @IsString()
  @IsNotEmpty({ message: 'city cannot be empty' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'state cannot be empty' })
  state: string;

  @IsString()
  @IsNotEmpty({ message: 'zipCode cannot be empty' })
  zipCode: string;

  @IsString()
  @IsNotEmpty({ message: 'country cannot be empty' })
  country: string;

  @IsString()
  @IsNotEmpty({ message: 'phoneNumber cannot be empty' })
  phoneNumber: string;
}
