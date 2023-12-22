import { Controller, Get, Query } from "@nestjs/common";
import { ManufacturerService } from "../services/manufacturer.service";

@Controller('manufacturer')
export class ManufacturerController {
    constructor(
        private readonly manufacturerService: ManufacturerService
    ) {}

    @Get()
    getAllManufacturers() {
        return this.manufacturerService.findAll()
    }

    @Get('/autocomplete')
    getByAutoComplete(@Query('q') query: string) {
        return this.manufacturerService.autocomplete(query)
    }
}