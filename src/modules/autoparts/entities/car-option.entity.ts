import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OptionType } from "../enums/option-types.enum";
import { Autopart } from "./autopart.entity";

@Entity()
export class CarOption {
    @PrimaryGeneratedColumn()
    option_id: number;

    @Column({length: 100, type: 'varchar'})
    name: string;

    @Column({nullable: true})
    parent_id: number;

    @Column({
        type: 'enum',
        default: OptionType.BRAND,
        enum: OptionType
    })
    option_type: OptionType;
    @Column({
        default: true
    })
    isActive: boolean;

    @ManyToOne(type => CarOption, carOption => carOption.children, { nullable: true })
    @JoinColumn({name: 'parent_id'})
    parent: CarOption;

    @OneToMany(type => CarOption, CarOption => CarOption.parent)
   
    children: CarOption[];

    @OneToMany(() => Autopart, autoPart => autoPart.carOption)
    autoParts: Autopart   
}