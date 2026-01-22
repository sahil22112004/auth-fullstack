import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { productQuery } from './interface/productqueryInterface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  // CREATE PRODUCT
  async create(createProductDto: CreateProductDto) {
    const { productName, price, photoUrl, description, userId, categoryId } = createProductDto;

    const product = this.productRepo.create({
      productName,
      price,
      photoUrl,
      description,
      userId: +userId,        
      categoryId: +categoryId, 
      rating: 0,
    });

    const savedProduct = await this.productRepo.save(product);
    return { message: 'successfuly added product', product: savedProduct };
  }

  async findAll(query: productQuery) {
    const { productName, categoryId, limit = 10, offset = 0 } = query;

    const productdata = this.productRepo.createQueryBuilder('product');

    if (productName) {
      productdata.andWhere('LOWER(product.productName) LIKE LOWER(:productName)', {
        productName: `%${productName}%`,
      });
    }

    if (categoryId) {
      productdata.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    productdata.skip(offset).take(limit);

    const [products, total] = await productdata.getManyAndCount();

    return { total, limit, offset, products };
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('product not found');
    }

    if (updateProductDto.userId) {
      (updateProductDto as any).userId = +updateProductDto.userId;
    }
    if (updateProductDto.categoryId) {
      (updateProductDto as any).categoryId = +updateProductDto.categoryId;
    }

    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepo.save(product);

    return { message: 'update successfully', product: updatedProduct };
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('product not found');
    }

    await this.productRepo.delete(id);
    return { message: 'product delete successfully', product };
  }
}
