import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartName } from "../entities/partname.entity";
import { Repository } from "typeorm";
import { CreatePartNameDto } from "../dto/create-partname.dto";

@Injectable()
export class PartNameService {
    constructor(
        @InjectRepository(PartName) private readonly partNameRepo: Repository<PartName>
    ) {}
    
    find() {
        return this.partNameRepo.find()
    }

    findOne() {

    }

    create(body: CreatePartNameDto) {
        const partName = this.partNameRepo.create(body)

        return this.partNameRepo.save(partName)
    }

    update() {

    }

    delete() {

    }
}