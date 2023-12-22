import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Price } from 'src/modules/price/entities/price.entity';


export default class CreatePriсes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "price" RESTART IDENTITY CASCADE`,
    );

    const priceRepo = connection.getRepository(Price)


  
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}