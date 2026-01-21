import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
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

  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

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
    const { email } = createAuthDto;

    const user = await this.userRepo.findOne({ where: { email } });

    if (user) {
      return { message: 'Signing in' };
    }

    await this.userRepo.save(createAuthDto);

    return { message: 'Registered successfully' };
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
