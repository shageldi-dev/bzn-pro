import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Manufacturer } from "../entities/manufacturer.entity";
import { Repository } from "typeorm";

@Injectable()
export class ManufacturerService {
    constructor(
        @InjectRepository(Manufacturer) private readonly manufacturerRepo: Repository<Manufacturer>
    ) {}

    findAll() {
        return this.manufacturerRepo.find()
    }

    autocomplete(query: string) {
        return this.manufacturerRepo.createQueryBuilder('manufacturer')
            .where(`manufacturer.name ILIKE '%${query}%'`)
            .getMany()
    }
}