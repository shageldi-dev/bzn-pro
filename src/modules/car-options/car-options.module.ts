import { Module } from '@nestjs/common';
import { CarOptionsService } from './car-options.service';
import { CarOptionsController } from './car-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../autoparts/entities/brand.entity';
import { Model } from '../autoparts/entities/model.entity';
import { Generated } from 'typeorm';
import { Generation } from '../autoparts/entities/generation.entity';

@Module({
  controllers: [CarOptionsController],
  providers: [CarOptionsService],
  imports: [TypeOrmModule.forFeature([Brand, Model, Generation])]
})
export class CarOptionsModule {}
