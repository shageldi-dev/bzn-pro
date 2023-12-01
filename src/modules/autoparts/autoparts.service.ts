import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutopartDto } from './dto/create-autopart.dto';
import { UpdateAutopartDto } from './dto/update-autopart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autopart } from './entities/autopart.entity';
import { CarOption } from './entities/car-option.entity';

@Injectable()
export class AutopartsService {
  constructor(
     @InjectRepository(Autopart) private readonly repo: Repository<Autopart>,
     @InjectRepository(CarOption) private readonly carOptionRepo: Repository<CarOption>
  ) {}

  async create(createAutopartDto: CreateAutopartDto) {
    const autoPart = this.repo.create(createAutopartDto)

    return this.repo.save(autoPart)
  }

  findAll(): Promise<Autopart[]> {
    return this.repo.find({ relations: ['model', 'brand'] });
  }

  async findOne(id: number): Promise<Autopart> {
    if (!id) {
      return null;
    }
    const autoPart = await this.repo.findOneBy({autopart_id: id});

    
    return autoPart;
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

  getAllCarOptions() {
    return this.carOptionRepo.find({ relations: ['children', 'autoParts'] })
  }

  async getCarOption(id: number) {
    const carOption = await this.carOptionRepo.findOneBy({option_id: id, }) 
    console.log(carOption.autoParts)
    return carOption.autoParts
  }
}
