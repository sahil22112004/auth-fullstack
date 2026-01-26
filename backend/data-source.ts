// import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/auth/entities/auth.entity';
import { Product } from './src/products/entities/product.entity';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import UserSeeder from './src/database/seeds/user.seeder';
import UserFactory from './src/database/factories/user.factory';
import { Category } from './src/category/entities/category.entity';
import { Address } from './src/address/entities/address.entity';
import { Order } from './src/orders/entities/order.entity';



const datasource :DataSourceOptions & SeederOptions={
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1104',
  database: 'auth',
  entities: [User,Product,Category,Address,Order],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
  factories: [UserFactory],
  seeds: [UserSeeder],
}

export const AppDataSource = new DataSource(datasource);

