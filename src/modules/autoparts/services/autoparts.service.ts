import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAutopartDto } from '../dto/create-autopart.dto';
import { UpdateAutopartDto } from '../dto/update-autopart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Autopart } from '../entities/autopart.entity';
import { Brand } from '../../car-options/entities/brand.entity';
import { Model } from '../../car-options/entities/model.entity';
import { Generation } from '../../car-options/entities/generation.entity';
import { Manufacturer } from '../../car-options/entities/manufacturer.entity';
import { Image } from '../entities/image.entity';
import * as sharp from 'sharp';
import { encode } from 'blurhash'
import * as path from 'path';
import { unlink } from 'fs/promises';
import { Price } from 'src/modules/price/entities/price.entity';

@Injectable()
export class AutopartsService {
  constructor(
     @InjectRepository(Autopart) private readonly repo: Repository<Autopart>,
     @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
     @InjectRepository(Model) private readonly modelRepo: Repository<Model>,
     @InjectRepository(Generation) private readonly generationRepo: Repository<Generation>,
     @InjectRepository(Manufacturer) private readonly manufacturerRepo: Repository<Manufacturer>,
     @InjectRepository(Image) private readonly imageRepo: Repository<Image>,
  ) {}

  async create(body: CreateAutopartDto, files: Express.Multer.File[]) {

    
    const autoPart = this.repo.create(body as Autopart)
    await this.repo.save(autoPart)


    /* files.forEach(async (file, index) => {
      const filePath = path.resolve('uploads', 'autopart-images', file.filename)
      
      try {
        const imageSharp =  sharp(filePath)
        const metadata = await imageSharp.metadata()
  
        imageSharp
        .resize({
          width: Math.floor(metadata.width / 4),
          height: Math.floor(metadata.height / 4)
        })
        .toFile(path.resolve("uploads", "autopart-images", "sm-" + file.filename))
  
      } catch (err) {
        console.log(err)
        throw new BadRequestException('unproccessable image')
      }

      let blurhash;
      try {
        blurhash = await this.generateBlurHash(filePath)
      } catch (error) {
        throw new InternalServerErrorException("failed generating blurhash")
      }

      const image = this.imageRepo.create({
        is_main: false, 
        src_original: '/autopart-images/' + file.filename,
        src_small: '/autopart-images/sm-' + file.filename,
        blurhash: blurhash,
        autopart: autoPart
      })

      if (index === 0) {
        image.is_main = true;
      }

      await this.imageRepo.save(image)
    }) */

    return autoPart
  }

  findAll(): Promise<Autopart[]> {
    return this.repo.find({ relations: ['model', 'brand', 'generation'] });
  }

  async findOne(id: number) {
    const autopart = await this.repo.createQueryBuilder("autopart")
    .leftJoinAndSelect("autopart.brand", "brand")
    .leftJoinAndSelect("autopart.model", "model")
    .leftJoinAndSelect("autopart.generation", "generation")
    .leftJoinAndSelect("autopart.images", "image")
    .where("autopart.autopart_id = :id", {id})
    .getOne()
    
    return autopart;
  }

  async autocomplete(query: string) {
    return this.repo.createQueryBuilder('autopart')
      .select('autopart.name')
      .where(`autopart.name ILIKE '%${query}%'`)
      .getMany()
  }

  async getCountByCrossNumber() {
    return this.repo.createQueryBuilder('autopart')
      .select('autopart.cross_number, COUNT(autopart_id) as count')
      .groupBy('autopart.cross_number')
      .getRawMany()
  }

  async update(id: number, updateAutopartDto: UpdateAutopartDto) {
    const autoPart = await this.repo.findOneBy({autopart_id: id})

    if (!autoPart) {
      throw new NotFoundException('autopart not found')
    }
    
    return this.repo.save({...autoPart, ...updateAutopartDto})
  }

  async remove(id: number) {

    const filePath = "../"

    const autoPart = await this.repo.findOneBy({autopart_id: id})

    if (!autoPart) {
      throw new NotFoundException('autopart not found')
    }

    const images = await this.imageRepo.find({where: {autopart_id: autoPart.autopart_id}})
    images.forEach(async image => {
      try {
        const pathToOriginalImage = path.join("uploads", image.src_original)
        console.log(pathToOriginalImage)
        const pathToSmallImage = path.join("uploads", image.src_small)
        await unlink(pathToOriginalImage)
        await unlink(pathToSmallImage)
      } catch (error) {
        console.log(error)
      }
    })

    return this.repo.remove(autoPart)
  }

   generateBlurHash = (buffer) => {
    return new Promise(async (resolve, reject) => {

      try {
        const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({
          resolveWithObject: true,
        });
        
        const encoded = encode(
          new Uint8ClampedArray(data),
          info.width,
          info.height,
          3,
          3
        );
        resolve(encoded);

      } catch (err) {
        reject(err);
      }
    });
  
  };

  async addImages(files: Express.Multer.File[], autopart_id: number) {
    for (const file of files) {
      await this.saveImage(file, autopart_id)
    }
  }

  async saveImage(file: Express.Multer.File, autopart_id: number, is_main?: boolean) {
    const filePath = path.resolve('uploads', 'autopart-images', file.filename)
      
    try {
      const imageSharp =  sharp(filePath)
      const metadata = await imageSharp.metadata()

      imageSharp
      .resize({
        width: Math.floor(metadata.width / 4),
        height: Math.floor(metadata.height / 4)
      })
      .toFile(path.resolve("uploads", "autopart-images", "sm-" + file.filename))

    } catch (err) {
      console.log(err)
      throw new BadRequestException('unproccessable image')
    }

    /* let blurhash;
    try {
      blurhash = await this.generateBlurHash(filePath)
    } catch (error) {
      throw new InternalServerErrorException("failed generating blurhash")
    } */

    const image = this.imageRepo.create({
      is_main: false, 
      src_original: '/autopart-images/' + file.filename,
      src_small: '/autopart-images/sm-' + file.filename,
      blurhash: "K6PZfSi_.A_3t7t7*0o#Dg",
      autopart_id: autopart_id
    })

    if (typeof is_main !== 'undefined' && is_main === true) {
      image.is_main = true
    }


    await this.imageRepo.save(image)
  }

}
