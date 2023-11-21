import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import PermissionEntity from 'src/modules/roles/entity/permission.entity';
import { RoleAction, RoleSubject } from 'src/modules/roles/roles.constant';

export default class CreatePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    // await connection.manager.query(
    //   `TRUNCATE TABLE "permission_entity" RESTART IDENTITY CASCADE`,
    // );
    await connection
      .createQueryBuilder()
      .insert()
      .into(PermissionEntity)
      .values([
        {
          action: RoleAction.MANAGE,
          subject: RoleSubject.ALL,
          roleId: 3,
        },
      ])
      .execute();
    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}
