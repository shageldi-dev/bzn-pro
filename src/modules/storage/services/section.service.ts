import { InjectRepository } from "@nestjs/typeorm";
import { Section } from "../entitities/section.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSectionDto } from "../dtos/create-section.dto";
import { UpdateSectionDto } from "../dtos/update-section.dto";

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section) private readonly sectionRepo: Repository<Section>
    ) {}

    getAll() {
        return this.sectionRepo.find()
    }

    async getOneByID(id: number) {
        const section = await this.sectionRepo.findOneBy({id})
        if (!section) {
            throw new NotFoundException('section not found')
        }

        return section
    }

    create(sectionBody: CreateSectionDto) {
        const section = this.sectionRepo.create(sectionBody)       

        return this.sectionRepo.save(section)
    }

    async update(id: number, updateBody: UpdateSectionDto) {
        const section = await this.sectionRepo.findOneBy({id})
        if (!section) {
            throw new NotFoundException('section not found')
        }

        const updatedSection = {...section, ...updateBody};

        return this.sectionRepo.save(updatedSection)
    }


    async delete(id: number) {
        const section = await this.sectionRepo.findOneBy({id})
        if (!section) {
            throw new NotFoundException('section not found')
        }

        return this.sectionRepo.remove(section)
    }
}