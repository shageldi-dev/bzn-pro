import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PartName } from 'src/modules/autoparts/entities/partname.entity';


export default class CreatePartNames implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "part_name" RESTART IDENTITY CASCADE`,
    );

    const partNameRepo = connection.getRepository(PartName)

    // partName id 1
    const airbag = partNameRepo.create({
      group_id: 1,
      name_en: "Airbag",
      name_ru: "воздушная подушка",
      name_tm: "Howa yassygy"
    })
    await partNameRepo.save(airbag)

    // partName id 2
    const door = partNameRepo.create({
      group_id: 3,
      name_en: "door",
      name_ru: "дверь",
      name_tm: "gapy"
    })
    await partNameRepo.save(door)

    // partName id 3
    const lights = partNameRepo.create({
      group_id: 3,
      name_en: "lights",
      name_ru: "фар",
      name_tm: "far"
    })

    await partNameRepo.save(lights)
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}