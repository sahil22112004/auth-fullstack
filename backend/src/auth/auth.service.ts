import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException(
        { message: 'Email already exists', status: 409 },
        409,
      );
    }

    const newUser = this.userRepo.create(createAuthDto);
    await this.userRepo.save(newUser);

    return { message: 'User registered successfully' };
  }

  async login(LoginAuthDto: LoginAuthDto) {
    const { email, password } = LoginAuthDto;

    const user = await this.userRepo.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new HttpException(
        { message: 'Invalid credentials', status: 404 },
        404,
      );
    }

    return user;
  }

  async siginwithGoogle(createAuthDto: CreateAuthDto) {
    console.log("google",createAuthDto)
    const { email } = createAuthDto;

    const user = await this.userRepo.findOne({ where: { email } });

    if (user) {
      return { message: 'Signing in' , user:user};
    }

    const newUser = this.userRepo.create(createAuthDto);
    await this.userRepo.save(newUser);

    return { message: 'Registered successfully',user:newUser };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
