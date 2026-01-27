import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  findAll() {
    return this.discountsService.findAll();
  }

  @Get(':discountname')
  findOne(@Param('discountname') discountname: string) {
    return this.discountsService.findOne(discountname);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountsService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountsService.remove(+id);
  }
}
