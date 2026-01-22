import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(createcategoryDto: CreateCategoryDto) {
    const exists = await this.categoryRepo.findOne({ where: { name: createcategoryDto.name }});
    if (exists) {
      throw new HttpException('Category already exists', 400);
    }
    const category = this.categoryRepo.create(createcategoryDto);
    return this.categoryRepo.save(category);
  }

  async findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id }});
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id }});
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    
    await this.categoryRepo.delete(id);
    return { message: 'Category removed successfully' };
  }
}
