/* import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`,
    );
    const password = await User.hashPassword('superdisabled123');
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Yol Bazon Tm',
          username: 'yolbazon',
          email: 'yolbazon@gmail.com',
          age: 0,
          password: password,
          gender: 'm',
          roleId: 3,
        },
      ])
      .execute();
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}
 */