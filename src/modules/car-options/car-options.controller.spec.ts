import { Test, TestingModule } from '@nestjs/testing';
import { CarOptionsController } from './car-options.controller';
import { CarOptionsService } from './car-options.service';

describe('CarOptionsController', () => {
  let controller: CarOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarOptionsController],
      providers: [CarOptionsService],
    }).compile();

    controller = module.get<CarOptionsController>(CarOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
