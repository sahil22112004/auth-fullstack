import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto[]) {
    return this.ordersService.create(dto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @Get('seller/:sellerId')
  findBySeller(@Param('sellerId') sellerId: string) {
    return this.ordersService.findBySeller(sellerId);
  }

  @Patch(':id/shipped')
  markShipped(@Param('id') id: string) {
    return this.ordersService.updateToShipped(id);
  }

  @Patch(':id/delivered')
  markDelivered(@Param('id') id: string) {
    return this.ordersService.updateToDelivered(id);
  }

  @Patch(':id/cancelled')
  markCancelled(@Param('id') id: string) {
    return this.ordersService.updateToCancelled(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
