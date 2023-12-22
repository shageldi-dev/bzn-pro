import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Storage } from 'src/modules/storage/entitities/storage.entity';


export default class CreateStorages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "storage" RESTART IDENTITY CASCADE`,
    );

    const storageRepo = connection.getRepository(Storage)

    // storage id  1
    const storage1 = storageRepo.create({
      name_en: 'Bedew store',
      name_ru: 'магазин на бедев',
      name_tm: 'Bedewdäki dükan',
      abbr: 'BDW',
      is_hidden: false,
      phone: '+99366666666',
      created_by: 1,
      description_tm: 'lorem ipsum',
      description_en: 'lorem ipsum',
      description_ru: 'lorem ipsum'
    })

    await storageRepo.save(storage1)

    // storage id 2
    const storage2 = storageRepo.create({
      name_en: 'store at G.Kuliyew',
    name_ru: 'магазин на объездной',
      name_tm: 'Obýezdnoydaky magazin',
      abbr: 'OBZ',
      is_hidden: false,
      phone: '+99366666667',
      created_by: 1,
      description_tm: 'lorem ipsum2',
      description_en: 'lorem ipsum2',
      description_ru: 'lorem ipsum2'
    })
    await storageRepo.save(storage2)

    // storage id 3
    const storage3 = storageRepo.create({
      name_en: 'aktam store',
      name_ru: 'магазин на aktam',
      name_tm: 'Aktamdaky dükan',
      abbr: 'AKT',
      is_hidden: false,
      phone: '+99366666668',
      created_by: 1,
      description_tm: 'lorem ipsum3',
      description_en: 'lorem ipsum3',
      description_ru: 'lorem ipsum3'
    })
    await storageRepo.save(storage3)
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}