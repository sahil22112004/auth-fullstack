import { Test, TestingModule } from '@nestjs/testing';
import { AdvertismentService } from './advertisment.service';

describe('AdvertismentService', () => {
  let service: AdvertismentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvertismentService],
    }).compile();

    service = module.get<AdvertismentService>(AdvertismentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
