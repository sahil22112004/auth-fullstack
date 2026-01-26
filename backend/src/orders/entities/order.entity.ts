import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum OrderStatus {
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  sellerId: string;

  @Column()
  addressId: string;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

 @Column({
    type: 'enum',
    enum: ['processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing'
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}


