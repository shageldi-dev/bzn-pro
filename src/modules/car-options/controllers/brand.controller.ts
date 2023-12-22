import { Controller, Get, Param, Query } from "@nestjs/common";
import { BrandService } from "../services/brand.service";

@Controller('brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService
    ) {}

    @Get()
    GetAllBrands() {
        return this.brandService.findAllBrands()
    }
    
    @Get('autocomplete')
    GetAllAutocomplete(@Query('q') query: string) {
        return this.brandService.autocomplete(query)
    }

    @Get('/:id/models')
    GetAllModelsOfBrand(@Param('id') id: string) {
        return this.brandService.findAllModelsOfBrand(+id)
    }


}