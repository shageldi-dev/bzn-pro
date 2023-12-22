import { Injectable } from '@nestjs/common';
import { CreateCarOptionDto } from '../dto/create-car-option.dto';
import { UpdateCarOptionDto } from '../dto/update-car-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { Generated, Repository } from 'typeorm';
import { Model } from '../entities/model.entity';
import { Generation } from '../entities/generation.entity';

@Injectable()
export class CarOptionsService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
    @InjectRepository(Model) private readonly modelRepo: Repository<Model>,
    @InjectRepository(Generation) private readonly generationRepo: Repository<Generation>
  ) {}

  create(createCarOptionDto: CreateCarOptionDto) {
    return 'This action adds a new carOption';
  }

  findAllBrands() {
    return this.brandRepo.find();
  }

  findAllModels() {
    return this.modelRepo.find();
  }

  findAllModelsOfBrand(brandId: number) {
    return this.modelRepo.find({where: {brand_id: brandId}})
  }

  findAllGenerations() {
    return this.generationRepo.find();
  }

  findAllGenerationsOfModel(modelId: number) {
    return this.generationRepo.find({where: {model_id: modelId}})
  }

  findOne(id: number) {
    return `This action returns a #${id} carOption`;
  }

  update(id: number, updateCarOptionDto: UpdateCarOptionDto) {
    return `This action updates a #${id} carOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} carOption`;
  }
}
