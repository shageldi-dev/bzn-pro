import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import RoleEntity from 'src/modules/roles/entity/role.entity';
import { Role } from 'src/auth/role';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    console.log('Role');
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "role_entity" RESTART IDENTITY CASCADE`,
    );

    await connection
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([
        {
          id: 1,
          name: Role.Admin,
        },
        {
          id: 2,
          name: Role.User,
        },
        {
          id: 3,
          name: Role.SuperAdmin,
        },
        {
          id: 4,
          name: Role.Manager,
        },
        {
          id: 5,
          name: Role.Worker,
        },
      ])
      .execute();
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}
