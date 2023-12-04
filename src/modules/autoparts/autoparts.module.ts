import { Module } from '@nestjs/common';
import { AutopartsService } from './services/autoparts.service';
import { AutopartsController } from './controllers/autoparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autopart } from './entities/autopart.entity';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Generation } from './entities/generation.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'

@Module({
  imports: [
    TypeOrmModule.forFeature([Autopart, Brand, Model, Generation, Manufacturer]),
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [AutopartsController],
  providers: [AutopartsService],
})
export class AutopartsModule {}
