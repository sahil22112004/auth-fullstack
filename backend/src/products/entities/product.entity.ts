import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

//   @Column({ unique: true })
//   email: string;

  @Column()
  productName: string;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column()
  price: number;

  @Column()
  rating:number;

  @Column()
  description: string;

  @Column()
  photoUrl:string

  @Column()
  userId:string

}