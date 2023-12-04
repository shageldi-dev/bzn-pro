import { Test, TestingModule } from '@nestjs/testing';
import { AutopartsService } from './autoparts.service';

describe('AutopartsService', () => {
  let service: AutopartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutopartsService],
    }).compile();

    service = module.get<AutopartsService>(AutopartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
