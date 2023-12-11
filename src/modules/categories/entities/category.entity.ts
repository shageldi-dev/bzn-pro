import { Autopart } from "src/modules/autoparts/entities/autopart.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name_tm: string;

    @Column({type: 'varchar', length: 100})
    name_en: string;

    @Column({type: 'varchar', length: 100})
    name_ru: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updated_at: Date;


    @OneToMany(() => Autopart, autopart => autopart.category, {})
    autoparts: Autopart[]
}
