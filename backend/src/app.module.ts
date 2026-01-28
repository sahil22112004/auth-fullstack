import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { OrdersModule } from './orders/orders.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';
import { Order } from './orders/entities/order.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { Wishlist } from './wishlist/entities/wishlist.entity';
import { DiscountsModule } from './discounts/discounts.module';
import { Discount } from './discounts/entities/discount.entity';
import { AdvertismentModule } from './advertisment/advertisment.module';
import { Advertisment } from './advertisment/entities/advertisment.entity';
import { ConfigModule } from '@nestjs/config'
import { config } from "dotenv"

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User,Product,Category,Address,Order,Wishlist,Discount,Advertisment],
    synchronize: false
    
  }),
    AuthModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    AddressModule,
    WishlistModule,
    DiscountsModule,
    AdvertismentModule,
  ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
