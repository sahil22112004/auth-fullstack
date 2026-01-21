import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { users } from './static/authdb';

@Injectable()
export class AuthService {
  register(createAuthDto: CreateAuthDto) {
    const {email,password}= createAuthDto
    const user = users.find((user)=>user.email==email)
    if(user){
      throw new HttpException({message:'Email already existed',status:409},409)
    }

    users.push(createAuthDto)

    return {message:'user register sucessfully'};
  }
  login(createAuthDto: CreateAuthDto) {
    const {email,password}= createAuthDto
    const user = users.find((user)=>user.email==email && user.password==password)
    if(!user){
      throw new HttpException({message:'invalid credential','status':404},404)
    }

    return user;
  }

  siginwithGoogle(createAuthDto: CreateAuthDto){
    const {email,password}= createAuthDto
    const user = users.find((user)=>user.email==email)
    if(user){
      return {message:'signing in'}
    }
    users.push(createAuthDto)
    return {message :'register succesfully'}


  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
