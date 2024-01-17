import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put, UseInterceptors, UploadedFiles, UploadedFile, Query } from '@nestjs/common';
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
    console.log(body)
    return this.autopartsService.create(body, files);
  }

  @Get()
  findAll() {
    return this.autopartsService.findAll();
  }

  @Get("/autocomplete")
  autocomplete(@Query('q') query: string) {
    return this.autopartsService.autocomplete(query)
  }

  @Get("/autocomplete-cross")
  autocompleteByCrossNo(@Query('q') query: string) {
    return this.autopartsService.autocompleteByCrossNo(query)
  }

  @Get("/count")
  getCountByCrossNumber() {
    return this.autopartsService.getCountByCrossNumber()
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
  @UseInterceptors(FilesInterceptor('image', 10, {
    storage: diskStorage({
      destination: './uploads/autopart-images',
      filename: (req, file, cb) => {
        const filename = `${uuid()}${path.extname(file.originalname)}`;
        cb(null, filename)
      }
    })
  }))
  async addImages(@UploadedFiles() files: Express.Multer.File[], @Param('id') autopart_id: string) {
    await this.autopartsService.addImages(files, +autopart_id)
    return {message: "images added successfully"}
  }

  
}
