import { Module } from '@nestjs/common';
import { CarOptionsService } from './services/car-options.service';
import { CarOptionsController } from './controllers/car-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Generated } from 'typeorm';
import { Generation } from './entities/generation.entity';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
import { ManufacturerController } from './controllers/manufacturer.controller';
import { ManufacturerService } from './services/manufacturer.service';
import { Manufacturer } from './entities/manufacturer.entity';

@Module({
  controllers: [CarOptionsController, BrandController, ManufacturerController],
  providers: [CarOptionsService, BrandService, ManufacturerService],
  imports: [TypeOrmModule.forFeature([Brand, Model, Generation, Manufacturer])]
})
export class CarOptionsModule {}
