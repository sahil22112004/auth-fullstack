import { Module } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentController } from './advertisment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisment } from './entities/advertisment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisment])],
  controllers: [AdvertismentController],
  providers: [AdvertismentService],
})
export class AdvertismentModule {}
