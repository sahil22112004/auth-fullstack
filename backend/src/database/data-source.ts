import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/auth.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: '',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // because we use migrations!
});
