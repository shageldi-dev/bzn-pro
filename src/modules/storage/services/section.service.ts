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

    async getAll() {
        const sections = await this.sectionRepo
        .createQueryBuilder('section')
        .leftJoinAndSelect('section.children', 'children')
        .getMany();

        return this.buildTree(sections);
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

    private buildTree(sections: Section[]): Section[] {
        const sectionMap = new Map<number, Section>();
        const result: Section[] = [];

        sections.forEach(section => {
            sectionMap.set(section.id, { ...section, children: [] });
        });

        sectionMap.forEach(section => {
            const parentId = section.parent_id;

            if (parentId && sectionMap.has(parentId)) {
            sectionMap.get(parentId).children.push(section);
            } else {
            result.push(section);
            }
        });

        return result;
    }
}