import { Module } from '@nestjs/common';
import { AutopartsService } from './services/autoparts.service';
import { AutopartsController } from './controllers/autoparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autopart } from './entities/autopart.entity';
import { Brand } from '../car-options/entities/brand.entity';
import { Model } from '../car-options/entities/model.entity';
import { Generation } from '../car-options/entities/generation.entity';
import { Manufacturer } from '../car-options/entities/manufacturer.entity';
import { Image } from './entities/image.entity';
import { PartNameController } from './controllers/partname.controller';
import { PartName } from './entities/partname.entity';
import { PartNameService } from './services/partname.service';
import { AutopartGroup } from './entities/autopart_group.entity';
import { AutopartGroupController } from './controllers/autopart-group.controller';
import { AutopartGroupService } from './services/autopart-group.service';
import { ManufacturerController } from '../car-options/controllers/manufacturer.controller';
import { ManufacturerService } from '../car-options/services/manufacturer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Autopart, Brand, Model, Generation, Image, PartName, AutopartGroup, Manufacturer]),
  ],
  controllers: [AutopartsController, PartNameController, AutopartGroupController],
  providers: [AutopartsService, PartNameService, AutopartGroupService],
})
export class AutopartsModule {}
