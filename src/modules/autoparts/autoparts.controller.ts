import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadGatewayException, Put } from '@nestjs/common';
import { AutopartsService } from './autoparts.service';
import { CreateAutopartDto } from './dto/create-autopart.dto';
import { UpdateAutopartDto } from './dto/update-autopart.dto';

@Controller('autoparts')
export class AutopartsController {
  constructor(private readonly autopartsService: AutopartsService) {}

  @Post()
  create(@Body() body: CreateAutopartDto) {
    console.log(body)
    return this.autopartsService.create(body);
  }

  @Get()
  findAll() {
    return this.autopartsService.findAll();
  }

  @Get('/options')
  getAllCarOptions() {
    return this.autopartsService.getAllCarOptions()
  }

  @Get('/options/:id')
  getCarOption(@Param('id') id: string) {
    return this.autopartsService.getCarOption(+id)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const autoPart = await this.autopartsService.findOne(+id);
    if (!autoPart) {
      throw new NotFoundException('Autopart not found');
    }

    return autoPart
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAutopartDto: UpdateAutopartDto) {
    return this.autopartsService.update(+id, updateAutopartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autopartsService.remove(+id);
  }

  
}
