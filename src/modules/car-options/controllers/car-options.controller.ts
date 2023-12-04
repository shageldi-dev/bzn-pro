import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarOptionsService } from '../car-options.service';
import { CreateCarOptionDto } from '../dto/create-car-option.dto';
import { UpdateCarOptionDto } from '../dto/update-car-option.dto';

@Controller('options')
export class CarOptionsController {
  constructor(private readonly carOptionsService: CarOptionsService) {}

  @Post()
  create(@Body() createCarOptionDto: CreateCarOptionDto) {
    return this.carOptionsService.create(createCarOptionDto);
  }

  @Get("/brands")
  findAllBrands() {
    return this.carOptionsService.findAllBrands();
  }

  @Get("/models")
  findAllModels() {
    return this.carOptionsService.findAllModels();
  }

  @Get("/models/of-brand/:brandId")
  findAllModelsOfBrand(@Param('brandId') brandId: string) {
    return this.carOptionsService.findAllModelsOfBrand(+brandId);
  }

  @Get("/generations")
  findAllGenerations() {
    return this.carOptionsService.findAllGenerations();
  }

  @Get("/generations/of-model/:modelId")
  findAllGenerationsOfModel(@Param('modelId') modelId: string) {
    return this.carOptionsService.findAllGenerationsOfModel(+modelId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarOptionDto: UpdateCarOptionDto) {
    return this.carOptionsService.update(+id, updateCarOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carOptionsService.remove(+id);
  }
}
