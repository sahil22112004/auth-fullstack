// import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/auth/entities/auth.entity';
import { Product } from './src/products/entities/product.entity';
import { runSeeders, SeederOptions } from 'typeorm-extension';
// import UserSeeder from './src/database/seeds/user.seeder';
// import UserFactory from './src/database/factories/user.factory';
import { Category } from './src/category/entities/category.entity';
import { Address } from './src/address/entities/address.entity';
import { Order } from './src/orders/entities/order.entity';
import { Wishlist } from './src/wishlist/entities/wishlist.entity';
import DiscountSeeder from './src/database/seeds/discout.seeder';
import { Discount } from './src/discounts/entities/discount.entity';



const datasource :DataSourceOptions & SeederOptions={
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'auth',
  entities: [User,Product,Category,Address,Order,Wishlist,Discount],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
  // factories: [UserFactory],
  seeds: [DiscountSeeder],
}

export const AppDataSource = new DataSource(datasource);

