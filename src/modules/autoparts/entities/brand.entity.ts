import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Autopart } from "./autopart.entity";
import { Model } from "./model.entity";

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @OneToMany(() => Model, model => model.brand)
    models: Model[]

    @OneToMany(() => Autopart, autopart => autopart.brand)
    autoparts: Autopart[];
}