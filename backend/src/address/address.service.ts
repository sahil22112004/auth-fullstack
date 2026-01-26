import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const newAddress = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(newAddress);
  }

  async findAll() {
    return await this.addressRepository.find();
  }
  async findByUser(userId: string) {
    const list = await this.addressRepository.find({ where: { userId } });

    if (!list || list.length === 0) {
      throw new NotFoundException(`No addresses found for user ${userId}`);
    }

    return list;
  }

  async findOne(id: string) {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const result = await this.addressRepository.update(id, updateAddressDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.addressRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return { message: `Address with id ${id} has been deleted` };
  }
}
