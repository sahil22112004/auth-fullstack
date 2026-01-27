import { HttpException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class WishlistService {

  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,){}

  async create(createWishlistDto: CreateWishlistDto) {
    const existing = await this.wishlistRepo.find({
      where: {
        userId: createWishlistDto.userId,
        productId: createWishlistDto.productId,
      },
    });

    if (existing.length) {
      return {message:'already in wishlistt'};
  }
   console.log('going in this')
      const WishlistItem = this.wishlistRepo.create({
      productId: createWishlistDto.productId,
      userId: createWishlistDto.userId,
    });
    await this.wishlistRepo.save(WishlistItem);
    return WishlistItem;
    
  }

  findAll() {
    return `This action returns all wishlist`;
  }
  async findforuser(id:number){
    console.log(id)
    const wishlist = await this.wishlistRepo.find({
      where: { userId:id},
      relations:{
        product:true,
        user:true
      }
    });
    if (!wishlist.length){
      throw new  HttpException('wishlist not found',404)
    }
    return wishlist

  // return this.wishlistRepo
  //   .createQueryBuilder('w')
  //   .leftJoin(
  //     Product,
  //     'p',
  //     'p.id = w.productID'
  //   )
  //   .select([
  //     'p.productName as product_name',
  //     'p.price as product_price',
  //     'p.description as product_discription',
  //     'p.photoUrl as product_photourl'
  //   ])
  //   .where('w.userId = :userId', { id })
  //   .getRawMany();

  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepo.find({
      where: { id},
    });
    if(wishlist.length){
      return {message:'existed',wishlist}
    }else{
      return {message:'existed'}
    }
    
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
