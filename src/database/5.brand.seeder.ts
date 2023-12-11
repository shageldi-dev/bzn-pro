import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Brand } from 'src/modules/car-options/entities/brand.entity';
import { Model } from 'src/modules/car-options/entities/model.entity';
import { Generation } from 'src/modules/car-options/entities/generation.entity';


export default class CreateCarOptions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "brand" RESTART IDENTITY CASCADE`,
    );
    await connection.manager.query(
      `TRUNCATE TABLE "model" RESTART IDENTITY CASCADE`,
    );
    await connection.manager.query(
      `TRUNCATE TABLE "generation" RESTART IDENTITY CASCADE`,
    );
    
    const brandRepo = connection.getRepository(Brand)
    const modelRepo = connection.getRepository(Model)
    const generationRepo = connection.getRepository(Generation)

    const toyota = brandRepo.create({name: 'Toyota'})
    const bmw = brandRepo.create({name: 'BMW'})
    await brandRepo.save(toyota)
    await brandRepo.save(bmw)

    const camry = modelRepo.create({name: 'Camry', brand: toyota})
    const avalon = modelRepo.create({name: 'Avalon', brand: toyota})
    await modelRepo.save(camry)
    await modelRepo.save(avalon)

    const camry1 = generationRepo.create({name: '1999-2001', model: camry})
    const camry2 = generationRepo.create({name: '2002-2004', model: camry})
    const camry3 = generationRepo.create({name: '2018-2020', model: camry})
    await generationRepo.save(camry1);
    await generationRepo.save(camry2);
    await generationRepo.save(camry3);

    const avalon1 = generationRepo.create({name: '1998-2000', model: avalon})
    const avalon2 = generationRepo.create({name: '2003-2006', model: avalon})
    const avalon3 = generationRepo.create({name: '2019-2022', model: avalon})
    await generationRepo.save(avalon1);
    await generationRepo.save(avalon2);
    await generationRepo.save(avalon3);
  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}