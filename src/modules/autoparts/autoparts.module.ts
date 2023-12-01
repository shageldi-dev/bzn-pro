import { Module } from '@nestjs/common';
import { AutopartsService } from './autoparts.service';
import { AutopartsController } from './autoparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autopart } from './entities/autopart.entity';
import { CarOption } from './entities/car-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autopart, CarOption])],
  controllers: [AutopartsController],
  providers: [AutopartsService],
})
export class AutopartsModule {}
