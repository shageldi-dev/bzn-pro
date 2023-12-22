import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PartName } from 'src/modules/autoparts/entities/partname.entity';
import { AutopartGroup } from 'src/modules/autoparts/entities/autopart_group.entity';


export default class CreateAutoPartGroups implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "autopart_group" RESTART IDENTITY CASCADE`,
    );

    const autoPartGroupRepo = connection.getRepository(AutopartGroup)

    // autopart_group id 1
    const autoart_group1 = autoPartGroupRepo.create({
      name_en: 'salon detail',
      name_ru: 'деталь салона',
      name_tm: 'salonyň detaly'
    })
    await autoPartGroupRepo.save(autoart_group1)

    // autopart_group id 2
    const autoart_group2 = autoPartGroupRepo.create({
      name_en: 'engine details',
      name_ru: 'ходовой',
      name_tm: 'hodowoy detallary'
    })
    await autoPartGroupRepo.save(autoart_group2)

    // autopart_group id 3
    const autoart_group3 = autoPartGroupRepo.create({
      name_en: 'body details',
      name_ru: 'детали кузова',
      name_tm: 'kuzow detallary'
    })
    
    await autoPartGroupRepo.save(autoart_group3)
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}