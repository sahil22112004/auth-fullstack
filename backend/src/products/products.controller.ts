import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { productQuery } from './interface/productqueryInterface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { productImageStorage } from '../config/multer';
import type { sellerproductQuery } from './interface/sellerproductqueruInterface';

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
    return this.productsService.create(createProductDto,files);
  }

  @Get()
  findAll(@Query() query: productQuery) {
    return this.productsService.findAll(query);
  }

  @Get('seller')
  findforseller(@Query() query: sellerproductQuery) {
    return this.productsService.findforseller(query);
  }

  @Get('admin/all')
findAllForAdmin() {
  return this.productsService.findAllForAdmin();
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(
    FilesInterceptor("photoUrl", 5, {
      storage: productImageStorage,
    }),
  )
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto ,@UploadedFiles() files: Express.Multer.File[]) {
    console.log("UPDATEDD",UpdateProductDto,id)
    return this.productsService.update(+id, UpdateProductDto,files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Patch('ban/:id')
updateBanStatus(
  @Param('id') id: string,
  @Body('isBanned') isBanned: boolean,
) {
  return this.productsService.updateBanStatus(+id, isBanned);
}

}
