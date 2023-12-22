import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { AuthGuard } from 'src/guard/auth.guard';



@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPriceDto: CreatePriceDto, @Request() req: any) {
    const price = {...createPriceDto, created_by: req.user.sub}
    return this.priceService.create(price);
  }

  @Get()
  findAll() {
    return this.priceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.priceService.update(+id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceService.remove(+id);
  }
}
