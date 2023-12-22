import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';


export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "category" RESTART IDENTITY CASCADE`,
    );

    const categoryRepo = connection.getRepository(Category)

    // category id  1
    const category1 = categoryRepo.create({
      name_en: 'category 1',
      name_ru: 'категория 1',
      name_tm: 'kategoriýa 1',
    })
    
    await categoryRepo.save(category1)

    // category id 2
    const category2 = categoryRepo.create({
      name_en: 'category 2',
      name_ru: 'категория 2',
      name_tm: 'kategoriýa 2',
    })
    await categoryRepo.save(category2)


    // category id 3
    const category3 = categoryRepo.create({
      name_en: 'category 3',
      name_ru: 'категория 3',
      name_tm: 'kategoriýa 3',
    })
    await categoryRepo.save(category3)
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}