import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Autopart } from "../../autoparts/entities/autopart.entity";
import { Generation } from "./generation.entity";
import { Brand } from "./brand.entity";

@Entity()
export class Model {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column()
    brand_id: number;

    @ManyToOne(() => Brand, brand => brand.models) 
    @JoinColumn({name: 'brand_id'})
    brand: Brand;

    @OneToMany(() => Generation, generation => generation.model)
    generations: Generation[];

    @OneToMany(() => Autopart, autopart => autopart.model)
    autoparts: Autopart[]

}