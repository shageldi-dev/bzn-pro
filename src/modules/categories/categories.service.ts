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
    return this.categoryRepo.createQueryBuilder('category')
      .select([
        'category.id',
        'category.name_tm',
        'category.name_ru',
        'category.name_en',
      ])
      .getMany()
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.createQueryBuilder('category')
      .leftJoinAndSelect('category.autoparts', 'autopart')
      .select([
        "category.id",
        "category.name_tm",
        "category.name_ru",
        "category.name_en",
        "autopart.name",
        "autopart.color",
        "autopart.comment",
        "autopart.cross_number",
        "autopart.is_archive",
        "autopart.is_used",
        "autopart.front_back",
        "autopart.left_right",
        "autopart.manufacturer_no",
        "autopart.marking",
        "autopart.note",
        "autopart.not_for_export",
        "autopart.number_of_part",
        "autopart.old_bar_code",
        "autopart.old_data",
        "autopart.site_link",
        "autopart.status",
        "autopart.year",
      ])
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
