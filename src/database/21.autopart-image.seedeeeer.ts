import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Autopart } from 'src/modules/autoparts/entities/autopart.entity';
import { Image } from 'src/modules/autoparts/entities/image.entity';


export default class CreateImages implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "image" RESTART IDENTITY CASCADE`,
    );

    const autoPartRepo = connection.getRepository(Image)


  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}