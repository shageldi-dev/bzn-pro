import { Test, TestingModule } from '@nestjs/testing';
import { CarOptionsService } from './car-options.service';

describe('CarOptionsService', () => {
  let service: CarOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarOptionsService],
    }).compile();

    service = module.get<CarOptionsService>(CarOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
