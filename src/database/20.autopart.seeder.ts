import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Autopart } from 'src/modules/autoparts/entities/autopart.entity';
import { FrontBack, Side } from 'src/modules/autoparts/enums/side.enum';
import { IsUsed } from 'src/modules/autoparts/enums/isused.enum';


export default class CreateAutoParts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "autopart" RESTART IDENTITY CASCADE`,
    );

    const autoPartRepo = connection.getRepository(Autopart)

    // without nullables
    // autopart id = 1
    const toyotaFar = autoPartRepo.create({
      brand_id: 1,
      name: "far"
    })
    await autoPartRepo.save(toyotaFar)

    // with all nullables
    // autopart id = 2
    const camryPorshen = autoPartRepo.create({
      brand_id: 1,
      model_id: 1,
      category_id: 1,
      color: 'grey',
      comment: 'хороший поршень',
      cross_number: '0B88-A122',
      front_back: FrontBack.FRONT,
      is_archive: false,
      generation_id: 3,
      is_used: IsUsed.NEW,
      left_right: Side.LEFT,
      marking: '09234ASL3092',
      manufacturer_no: '293AS2-A13D',
      name: 'PORSHEN',
      note: 'заметка lorem ipsum',
      number_of_part: 12,
      not_for_export: false,
    })

    await autoPartRepo.save(camryPorshen)

    // mixed
    // autopart id = 3
    const speedometer = autoPartRepo.create({
      brand_id: 2,
      color: 'black',
      cross_number: '0B88-A122',
      is_used: IsUsed.NEW,
      left_right: Side.LEFT,
      marking: '09234ASL3092',
      manufacturer_no: '293AS2-A13D',
      name: 'speedometer',
      note: 'заметка lorem ipsum',
      number_of_part: 13,
    })

    await autoPartRepo.save(speedometer)

    
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}