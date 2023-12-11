import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
  ) {}
  create(body: CreateCategoryDto) {
    const category = this.categoryRepo.create(body)
    return this.categoryRepo.save(category)
  }

  findAll() {
    return this.categoryRepo.find()
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.createQueryBuilder('category')
      .leftJoinAndSelect('category.autoparts', 'autopart')
      .where("category.id = :id", {id})
      .getOne();

    if (!category) {
      throw new NotFoundException("category not found")
    }

    return category
  }

  async update(id: number, updateBody: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({id})
    
    if (!category) {
      throw new NotFoundException('category not found')
    }

    return this.categoryRepo.save({...category, ...updateBody})
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({id});

    if (!category) {
      throw new NotFoundException('category not found')
    }

    return this.categoryRepo.remove(category);
  }
}
