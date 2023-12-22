import { Body, Controller, Get, Post } from "@nestjs/common";
import { PartNameService } from "../services/partname.service";
import { CreatePartNameDto } from "../dto/create-partname.dto";

@Controller('partname')
export class PartNameController {
    constructor(
        private readonly partNameService: PartNameService
    ) {}
    
    @Get()
    getAllPartNames() {
        return this.partNameService.find()
    }

    @Post()
    createPartName(@Body() body: CreatePartNameDto) {
        return this.partNameService.create(body)
    }

    
}