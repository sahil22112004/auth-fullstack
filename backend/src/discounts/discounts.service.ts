import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
      @InjectRepository(Discount)
      private discountRepo: Repository<Discount>,
    ) {}

  
  create(createDiscountDto: CreateDiscountDto) {
    return 'This action adds a new discount';
  }

  findAll() {
    return `This action returns all discounts`;
  }

  findOne(discountname: string) {
    const findDiscount = 


    


    // return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
