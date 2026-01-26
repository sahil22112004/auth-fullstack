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

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1104',
    database: 'auth',
    entities: [User,Product,Category,Address,Order],
    synchronize: false
  }),
    AuthModule,
    ProductsModule,
    CategoryModule,
    OrdersModule,
    AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
