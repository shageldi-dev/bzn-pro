import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "../entities/brand.entity";
import { Repository } from "typeorm";
import { Model } from "../entities/model.entity";
import { Generation } from "../entities/generation.entity";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
        @InjectRepository(Model) private readonly modelRepo: Repository<Model>,
        @InjectRepository(Generation) private readonly generationRepo: Repository<Generation>
    ) {}
    
    autocomplete(query: string) {
        return this.brandRepo.createQueryBuilder('brand')
            .where(`brand.name ILIKE '%${query}%'`)
            .getMany();
    }

    findAllBrands() {
        return this.brandRepo.find();
    }

    findAllModelsOfBrand(brandId: number) {
        return this.modelRepo.find({where: {brand_id: brandId}})
    }
}