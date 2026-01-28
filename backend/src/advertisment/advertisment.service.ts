import { Injectable } from '@nestjs/common';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';
import { UpdateAdvertismentDto } from './dto/update-advertisment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisment } from './entities/advertisment.entity';

@Injectable()
export class AdvertismentService {

  constructor(
        @InjectRepository(Advertisment)
        private AdvertismentRepo: Repository<Advertisment>,
      ) {}
  create(createAdvertismentDto: CreateAdvertismentDto) {
    return 'This action adds a new advertisment';
  }

  async findAll() {
    return await this.AdvertismentRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} advertisment`;
  }

  update(id: number, updateAdvertismentDto: UpdateAdvertismentDto) {
    return `This action updates a #${id} advertisment`;
  }

  remove(id: number) {
    return `This action removes a #${id} advertisment`;
  }
}
