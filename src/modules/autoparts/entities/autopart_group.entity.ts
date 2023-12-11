import { Section } from "src/modules/storage/entitities/section.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PartName } from "./partname.entity";

@Entity()
export class AutopartGroup {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name_tm: string;

    @Column({type: 'varchar', length: 255})
    name_ru: string;

    @Column({type: 'varchar', length: 255})
    name_en: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updated_at: Date;

    @OneToMany(() => Section, section => section.autopart_group)
    sections: Section[];

    @OneToMany(() => PartName, partName => partName.autopart_group)
    partNames: PartName;
}