import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Address } from '../address/entities/address.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(dto: any[]) {
    for (const item of dto) {
      const totalAmount = Number(item.price) * Number(item.quantity);

      const order = this.orderRepo.create({
        ...item,
        totalAmount,
        status: 'processing',
      });

      await this.orderRepo.save(order);
    }

    return { message: 'ordered successfully' };
  }

  async findAll() {
    return this.orderRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

 async findByUser(userId: string) {
  return this.orderRepo
    .createQueryBuilder('o')
    .leftJoin(
      Address,
      'a',
      'a.id = o.addressId'
    )
    .select([
      'o.id AS id',
      'o.userId AS userId',
      'o.sellerId AS sellerId',
      'o.addressId AS addressId',
      'o.productId AS productId',
      'o.productName AS productName',
      'o.quantity AS quantity',
      'o.price AS price',
      'o.totalAmount AS totalAmount',
      'o.status AS status',
      'o.createdAt AS createdAt',
      'a.fullName AS address_fullName',
      'a.street AS address_street',
      'a.city AS address_city',
      'a.state AS address_state',
      'a.zipCode AS address_zipCode',
      'a.country AS address_country',
      'a.phoneNumber AS address_phoneNumber'
    ])
    .where('o.userId = :userId', { userId })
    .orderBy('o.createdAt', 'DESC')
    .getRawMany();
}

  async findBySeller(sellerId: string) {
  return this.orderRepo
    .createQueryBuilder('o')
    .leftJoin(
      Address,
      'a',
      'a.id = o.addressId'
    )
    .select([
      'o.id AS id',
      'o.userId AS userId',
      'o.sellerId AS sellerId',
      'o.addressId AS addressId',
      'o.productId AS productId',
      'o.productName AS productName',
      'o.quantity AS quantity',
      'o.price AS price',
      'o.totalAmount AS totalAmount',
      'o.status AS status',
      'o.createdAt AS createdAt',
      'a.fullName AS address_fullName',
      'a.street AS address_street',
      'a.city AS address_city',
      'a.state AS address_state',
      'a.zipCode AS address_zipCode',
      'a.country AS address_country',
      'a.phoneNumber AS address_phoneNumber'
    ])
    .where('o.sellerId = :sellerId', { sellerId })
    .orderBy('o.createdAt', 'DESC')
    .getRawMany();
}

  async updateToShipped(id: string) {
    const order = await this.findOne(id);

    if (order.status === 'shipped')
      throw new HttpException('Order already shipped', HttpStatus.BAD_REQUEST);

    if (order.status !== 'processing')
      throw new HttpException('Only processing orders can be shipped', HttpStatus.BAD_REQUEST);

    order.status = 'shipped';
    return this.orderRepo.save(order);
  }

  async updateToDelivered(id: string) {
    const order = await this.findOne(id);

    if (order.status === 'delivered')
      throw new HttpException('Order already delivered', HttpStatus.BAD_REQUEST);

    if (order.status !== 'shipped')
      throw new HttpException('Only shipped orders can be delivered', HttpStatus.BAD_REQUEST);

    order.status = 'delivered';
    return this.orderRepo.save(order);
  }

  async updateToCancelled(id: string) {
    const order = await this.findOne(id);

    if (order.status === 'cancelled')
      throw new HttpException('Order already cancelled', HttpStatus.BAD_REQUEST);

    if (order.status === 'delivered')
      throw new HttpException('Delivered orders cannot be cancelled', HttpStatus.BAD_REQUEST);

    order.status = 'cancelled';
    return this.orderRepo.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepo.remove(order);
    return { message: `Order ${id} deleted successfully` };
  }
}
