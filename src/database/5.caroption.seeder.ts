import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import PermissionEntity from 'src/modules/roles/entity/permission.entity';
import { RoleAction, RoleSubject } from 'src/modules/roles/roles.constant';
import { CarOption } from 'src/modules/autoparts/entities/car-option.entity';
import { OptionType } from 'src/modules/autoparts/enums/option-types.enum';

export default class CreateCarOptions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query('SET CONSTRAINTS ALL DEFERRED');
    await connection.manager.query(
      `TRUNCATE TABLE "car_option" RESTART IDENTITY CASCADE`,
    );
    
    const carRepo = connection.getRepository(CarOption)

        const toyota = carRepo.create({ name: "Toyota" });
        
        
        
        
        //const ['4Runner', 'Aristo', 'Aurion']
        const alfaRomeo = carRepo.create({ name: "ALFA ROMEO" });
        const audi = carRepo.create({ name: "Audi" });
        const belarus = carRepo.create({ name: "Belarus" });
        // ... create entries for other brands in the same way

        await carRepo.save(toyota);
        await carRepo.save(alfaRomeo);
        await carRepo.save(audi);
        await carRepo.save(belarus);

        const aurion = carRepo.create({name: 'Aurion', option_type: OptionType.MODEL, parent: toyota})
        const aristo = carRepo.create({name: 'Aristo', option_type: OptionType.MODEL, parent: toyota})
        await carRepo.save(aristo)
        await carRepo.save(aurion)

    await connection.query('SET CONSTRAINTS ALL IMMEDIATE');
  }
}