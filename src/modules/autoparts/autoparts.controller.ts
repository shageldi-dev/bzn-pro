import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadGatewayException, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AutopartsService } from './autoparts.service';
import { CreateAutopartDto } from './dto/create-autopart.dto';
import { UpdateAutopartDto } from './dto/update-autopart.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('autoparts')
export class AutopartsController {
  constructor(private readonly autopartsService: AutopartsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File,@Body() body: CreateAutopartDto) {
    // return console.log(body)
    return this.autopartsService.create(body);
  }

  @Get()
  findAll() {
    return this.autopartsService.findAll();
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
