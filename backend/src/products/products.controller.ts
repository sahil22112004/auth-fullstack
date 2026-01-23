import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { productQuery } from './interface/productqueryInterface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { productImageStorage } from '../config/multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor("photoUrl", 5, {
      storage: productImageStorage,
    }),
  )
  create(@UploadedFiles() files: Express.Multer.File[],  @Body() createProductDto: CreateProductDto) {
    console.log("ygygugghg",createProductDto)
    // return this.productsService.create(createProductDto,files);
  }

  @Get()
  findAll(@Query() query: productQuery) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
