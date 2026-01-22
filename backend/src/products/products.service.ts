import { HttpException, Injectable } from '@nestjs/common';
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
  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto)
    const {productName,price,photoUrl,description,userId,category,subcategory}=  createProductDto

    const product = {
      productName:productName,
      price:price,
      photoUrl:photoUrl,
      description:description,
      userId:userId,
      category:category,
      subcategory:subcategory,
      rating:0
    }
    const addProduct = this.productRepo.create({...product})
    await this.productRepo.save(addProduct)
    return {message:'successfuly added product'};
  }

async findAll(queryDto: productQuery) {
  const { offset = 0, limit = 10, category, subcategory } = queryDto;
  let products = await this.productRepo.find();

  if (category) {
  products = products.filter((product) => product.category === category);
}
if (subcategory) {
  products = products.filter((product) => product.subcategory === subcategory);
}

const total = products.length;

const paginatedproducts = await this.productRepo.find({
  skip: offset,
  take: limit,
});

  return {products:paginatedproducts,total:total}
}

  async findOne(id: number) {
    console.log(id)
    const product = await this.productRepo.findOne({
      where: { id },});
    if (!product) {
      throw new HttpException({ message: "product not found" }, 404);
    }
    return product;;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateproduct = await this.productRepo.findOne({where: { id }});
    if (!updateproduct) {
      throw new HttpException({ message: "product not found" }, 404)
    }
    
    await this.productRepo.update(id,updateProductDto)
    return {message:'upadate successfully'};
  }

  async remove(id: number) {
    const deletedproduct = await this.productRepo.findOne({where: { id }});
    if (!deletedproduct) {
      throw new HttpException({ message: "product not found" }, 404)
    }
    await this.productRepo.delete(id)
    return {message:'product Delete Succesfully'};
  }
}




// async findAll(queryDto: ProductQueryDto) {
//   const { page, limit, category, subcategory } = queryDto;
//   let products = await this.productRepo.find();
//   console.log(products);
//   if (category) {
//   products = products.filter((p) => p.category === category);
// }
// if (subcategory) {
//   products = products.filter((p) => p.subcategory === subcategory);
// }
// const total = products.length;
//  if (limit !== undefined && page !== undefined) {
//    const offset = page - 1 * limit;
//    const paginatedproducts = await this.productRepo.find({
//     skip: offset,
//     take: limit,
//     });
//     if (limit !== undefined && page !== undefined) {
//       const offset = page - 1 * limit;
//       const paginatedproducts = products.slice(offset, offset + limit);
//       return {
//         paginatedproducts,
//         total,
//         offset: Number(offset),
//         limit: Number(limit),
//       };
//     }
//     return products
//   }