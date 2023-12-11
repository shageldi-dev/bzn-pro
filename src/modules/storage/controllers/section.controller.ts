import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Section } from "../entitities/section.entity";
import { SectionService } from "../services/section.service";
import { CreateSectionDto } from "../dtos/create-section.dto";
import { UpdateSectionDto } from "../dtos/update-section.dto";

@Controller('sections')
export class SectionController {
    constructor(
        private readonly sectionService: SectionService
    ) {}
    
    @Get("/")
    getAllSections() {
        return this.sectionService.getAll()
    }

    @Get("/:id")
    getOneSection(@Param('id') id: string) {
        return this.sectionService.getOneByID(+id)
    }

    @Post("/")
    createSection(@Body() body: CreateSectionDto) {
        return this.sectionService.create(body)
    }

    @Put("/:id")
    updateSection(@Param('id') id: number, @Body() updateBody: UpdateSectionDto) {
        return this.sectionService.update(id, updateBody)
    }

    @Delete("/:id")
    deleteSection(@Param('id') id: string) {
        return this.sectionService.delete(+id)
    }
}