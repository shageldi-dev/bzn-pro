import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Autopart } from "../../autoparts/entities/autopart.entity";
import { Model } from "./model.entity";

@Entity()
export class Generation {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, type: 'varchar'})
    name: string;

    @Column()
    model_id: number;

    @ManyToOne(() => Model, model => model.generations)
    @JoinColumn({name: 'model_id'})
    model: Model;

    @OneToMany(() => Autopart, autopart => autopart.generation)
    autoparts: Autopart[];
}