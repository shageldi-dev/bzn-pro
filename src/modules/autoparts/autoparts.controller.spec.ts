import { Test, TestingModule } from '@nestjs/testing';
import { AutopartsController } from './autoparts.controller';
import { AutopartsService } from './autoparts.service';

describe('AutopartsController', () => {
  let controller: AutopartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutopartsController],
      providers: [AutopartsService],
    }).compile();

    controller = module.get<AutopartsController>(AutopartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
