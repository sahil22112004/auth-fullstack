import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { productQuery } from './interface/productqueryInterface';
import { sellerproductQuery } from './interface/sellerproductqueruInterface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto ,files: Express.Multer.File[]) {
    const { productName, price, description, userId, categoryId,stock } = createProductDto;
    const photoUrl =
      files?.map((file) => `http://localhost:3000/uploads/${file.filename}`) ||
      [];

    const product = this.productRepo.create({
      productName,
      price,
      photoUrl,
      description,
      stock:+stock,
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

    return { total, products };
  }
  async findforseller(query: sellerproductQuery) {
    const { id, productName, categoryId, limit = 10, offset = 0 } = query;

    const productdata = this.productRepo.createQueryBuilder('product');

    productdata.andWhere('product.userId = :id',{id})

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

    return { total, products };
  }

  async findAllForAdmin() {
  return await this.productRepo.find();
}


  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new HttpException('product not found',404);
    }

    return product;
  }

  async update(id: number, UpdateProductDto: UpdateProductDto ,files: Express.Multer.File[]) {
    console.log('working')

    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException("Product not found", 404);
    }
    let photoUrl = product.photoUrl;

    if (files?.length) {
      photoUrl = files.map(
        (file) => `http://localhost:3000/uploads/${file.filename}`,
      );
    }
    console.log("product",product)
    console.log("UpdateProductDto",UpdateProductDto)

    const updatedProduct :any= {
      ...product,
      ...UpdateProductDto,
      photoUrl,
    };

    console.log(updatedProduct)

    await this.productRepo.save(updatedProduct);
    return {status:'fullfield',message:'successfuly update product', updatedProduct};

    //     const { productName, price, description, userId, categoryId,stock } = createProductDto;

    // let photoUrl:any[] = await this.productRepo.findOne({where:{id},select:['photoUrl']})
    // if(files?.length){
    //   photoUrl =files?.map((file) => `http://localhost:3000/uploads/${file.filename}`) ||[];
    // }
    
    // const product ={
    //   productName,
    //   price,
    //   photoUrl,
    //   description,
    //   stock:+stock,
    //   userId: +userId,        
    //   categoryId: +categoryId, 
    //   rating: 0,
    // }

    // const savedProduct = await this.productRepo.save(product);
    // return { message: 'successfuly added product', product: savedProduct };

  }

  async remove(id: number) {
    console.log(id)
    const product = await this.productRepo.find({ where: { id } });
    console.log(product)
    if (!product) {
      throw new HttpException('product not found',404);
    }

    await this.productRepo.delete({id});
    return { message: 'product delete successfully', product };
  }
  async updateBanStatus(id: number, isBanned: boolean) {
  const product = await this.productRepo.findOne({ where: { id } });

  if (!product) {
    throw new HttpException(
      { message: 'Product not found', status: 404 },
      404,
    );
  }

  product.isBanned = isBanned;
  await this.productRepo.save(product);

  return {
    message: `Product ${isBanned ? 'banned' : 'unbanned'} successfully`,
    product,
  };
}

}
