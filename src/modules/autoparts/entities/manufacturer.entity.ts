import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Autopart } from "./autopart.entity";

@Entity()
export class Manufacturer {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @OneToMany(() => Autopart, autopart => autopart.manufacturer_id)
    autoparts: Autopart[]
}


