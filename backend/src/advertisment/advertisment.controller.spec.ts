import { Test, TestingModule } from '@nestjs/testing';
import { AdvertismentController } from './advertisment.controller';
import { AdvertismentService } from './advertisment.service';

describe('AdvertismentController', () => {
  let controller: AdvertismentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertismentController],
      providers: [AdvertismentService],
    }).compile();

    controller = module.get<AdvertismentController>(AdvertismentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
