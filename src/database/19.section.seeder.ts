import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Section } from 'src/modules/storage/entitities/section.entity';


export default class CreateSections implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "section" RESTART IDENTITY CASCADE`,
    );

    const sectionRepo = connection.getRepository(Section)

    // section id  1
    const section1 = sectionRepo.create({
      storage_id: 1,
      name_en: 'section1',
      name_ru: 'раздел 1',
      name_tm: 'bölümçe 1',
      section_number: 1,
      section_type: 'warehouse',
      space_count: 150,
    })
    
    await sectionRepo.save(section1)

    // section id 2
    const section2 = sectionRepo.create({
      parent_id: 2,
      storage_id: 1,
      name_en: 'section2',
      name_ru: 'раздел 2',
      name_tm: 'bölümçe 2',
      section_number: 2,
      section_type: 'section',
      space_count: 200,
    })
    
    await sectionRepo.save(section2)

    // section id 3
    const section3 = sectionRepo.create({
      parent_id: 3,
      storage_id: 1,
      name_en: 'section3',
      name_ru: 'раздел 3',
      name_tm: 'bölümçe 3',
      section_number: 3,
      section_type: 'shelf',
      space_count: 500,
    })
    
    await sectionRepo.save(section3)
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}

