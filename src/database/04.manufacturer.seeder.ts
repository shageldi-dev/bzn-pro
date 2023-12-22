import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Manufacturer } from 'src/modules/car-options/entities/manufacturer.entity';


export default class CreateManufacturers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "manufacturer" RESTART IDENTITY CASCADE`,
    );

    const manufacturerRepo = connection.getRepository(Manufacturer)

    // manufacturer id  1
    const manufacturer1 = manufacturerRepo.create({
      name: 'toyota'
    })
    
    await manufacturerRepo.save(manufacturer1)

    // manufacturer id 2
    const manufacturer2 = manufacturerRepo.create({
      name: 'bmw'
    })
    await manufacturerRepo.save(manufacturer2)


    // manufacturer id 3
    const manufacturer3 = manufacturerRepo.create({
      name: 'lukoil'
    })
    await manufacturerRepo.save(manufacturer3)
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}