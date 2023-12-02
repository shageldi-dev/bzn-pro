import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutopartDto } from './dto/create-autopart.dto';
import { UpdateAutopartDto } from './dto/update-autopart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Autopart } from './entities/autopart.entity';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Generation } from './entities/generation.entity';
import { Manufacturer } from './entities/manufacturer.entity';

@Injectable()
export class AutopartsService {
  constructor(
     @InjectRepository(Autopart) private readonly repo: Repository<Autopart>,
     @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
     @InjectRepository(Model) private readonly modelRepo: Repository<Model>,
     @InjectRepository(Generation) private readonly generationRepo: Repository<Generation>,
     @InjectRepository(Manufacturer) private readonly manufacturerRepo: Repository<Manufacturer>
  ) {}

  async create(body: CreateAutopartDto) {
    const autoPart = this.repo.create(body)

    return this.repo.save(autoPart)
  }

  findAll(): Promise<Autopart[]> {
    return this.repo.find({ relations: ['model', 'brand', 'generation'] });
  }

  async findOne(id: number) {
    const autopart = await this.repo.createQueryBuilder("autopart")
    .leftJoinAndSelect("autopart.brand", "brand")
    .leftJoinAndSelect("autopart.model", "model")
    .leftJoinAndSelect("autopart.generation", "generation")
    .where("autopart_id = :id", {id})
    .getOne()
    
    return autopart;
  }

  async update(id: number, updateAutopartDto: UpdateAutopartDto) {
    const autoPart = await this.repo.findOneBy({autopart_id: id})

    if (!autoPart) {
      throw new NotFoundException('autopart not found')
    }
    
    return this.repo.save({...autoPart, ...updateAutopartDto})
  }

  async remove(id: number) {
    const autoPart = await this.repo.findOneBy({autopart_id: id})

    if (!autoPart) {
      throw new NotFoundException('autopart not found')
    }

    return this.repo.remove(autoPart)
  }

}
