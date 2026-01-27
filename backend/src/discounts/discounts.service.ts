import { HttpException, Injectable } from '@nestjs/common';
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

  async findOne(discountName: string) {
  const discount = await this.discountRepo.findOne({
    where: { discountName }
  });

  if (!discount) {
    throw new HttpException(
      { message: "Invalid discount code", status: 404 },
      404
    );
  }

  return {
    discountName: discount.discountName,
    discountPercentage: Number(discount.discountPercentage)
  };
}


  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
