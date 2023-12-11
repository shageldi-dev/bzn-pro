import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { AutopartsService } from '../services/autoparts.service';
import { CreateAutopartDto } from '../dto/create-autopart.dto';
import { UpdateAutopartDto } from '../dto/update-autopart.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid'

@Controller('autoparts')
export class AutopartsController {
  constructor(private readonly autopartsService: AutopartsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads/autopart-images',
      filename: (req, file, cb) => {
        const fileName = `${uuid()}${path.extname(file.originalname)}`;
        cb(null, fileName)
      }
    })
  }))
  create(@UploadedFiles() files: Express.Multer.File[], @Body() body: CreateAutopartDto) {
    // return console.log(typeof files)
    const fileNames = files.map(file => file.filename)
    return this.autopartsService.create(body, files);
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

  /* Image routes */
  @Post("/:id/images")
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/autopart-images',
      filename: (req, file, cb) => {
        const filename = `${uuid()}${path.extname(file.originalname)}`;
        cb(null, filename)
      }
    })
  }))
  addImage(@UploadedFile() file: Express.Multer.File, @Param('id') autopart_id: string) {
    return this.autopartsService.addImage(file, +autopart_id)
  }

  
}
