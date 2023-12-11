import { Module } from '@nestjs/common';
import { AutopartsService } from './services/autoparts.service';
import { AutopartsController } from './controllers/autoparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autopart } from './entities/autopart.entity';
import { Brand } from '../car-options/entities/brand.entity';
import { Model } from '../car-options/entities/model.entity';
import { Generation } from '../car-options/entities/generation.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Autopart, Brand, Model, Generation, Manufacturer, Image]),
  ],
  controllers: [AutopartsController],
  providers: [AutopartsService],
})
export class AutopartsModule {}
