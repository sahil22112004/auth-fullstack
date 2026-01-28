// import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/auth/entities/auth.entity';
import { Product } from './src/products/entities/product.entity';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import UserSeeder from './src/database/seeds/user.seeder';
// import UserFactory from './src/database/factories/user.factory';
import { Category } from './src/category/entities/category.entity';
import { Address } from './src/address/entities/address.entity';
import { Order } from './src/orders/entities/order.entity';
import { Wishlist } from './src/wishlist/entities/wishlist.entity';
import DiscountSeeder from './src/database/seeds/discout.seeder';
import { Discount } from './src/discounts/entities/discount.entity';
import AdvertisementSeeder from './src/database/seeds/advertisement.seeder';
import { Advertisment } from './src/advertisment/entities/advertisment.entity';
import { config } from "dotenv"

config();

const datasource :DataSourceOptions & SeederOptions={
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User,Product,Category,Address,Order,Wishlist,Discount,Advertisment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
  // factories: [UserFactory],
  seeds: [AdvertisementSeeder,DiscountSeeder,UserSeeder],
  ssl: {
    rejectUnauthorized: false,
  },
}

export const AppDataSource = new DataSource(datasource);

