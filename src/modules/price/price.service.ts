import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price) private readonly priceRepo: Repository<Price>
  ) {}
  
  create(body: any) {
    const price = this.priceRepo.create(body)
    return this.priceRepo.save(price)
  }

  findAll() {
    return this.priceRepo.find()
  }

  findOne(id: number) {
    return this.priceRepo.findOneBy({id});
  }

  async update(id: number, updateBody: UpdatePriceDto) {
    const price = await this.priceRepo.findOneBy({id})
    if (!price) {
      throw new NotFoundException('price not found')
    }

    return this.priceRepo.save(price)
  }

  async remove(id: number) {
    const price = await this.priceRepo.findOneBy({id})
    if (!price) {
      throw new NotFoundException('price not found')
    }

    return this.priceRepo.remove(price)
  }
}
