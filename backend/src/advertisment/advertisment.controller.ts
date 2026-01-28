import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { CreateAdvertismentDto } from './dto/create-advertisment.dto';
import { UpdateAdvertismentDto } from './dto/update-advertisment.dto';

@Controller('advertisment')
export class AdvertismentController {
  constructor(private readonly advertismentService: AdvertismentService) {}

  @Post()
  create(@Body() createAdvertismentDto: CreateAdvertismentDto) {
    return this.advertismentService.create(createAdvertismentDto);
  }

  @Get()
  findAll() {
    return this.advertismentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertismentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertismentDto: UpdateAdvertismentDto) {
    return this.advertismentService.update(+id, updateAdvertismentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertismentService.remove(+id);
  }
}
