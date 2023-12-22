import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AutopartGroup } from "./autopart_group.entity";

@Entity()
export class PartName {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    group_id: number;
    
    @Column({type: 'varchar', length: 255, unique: true})
    name_tm: string;

    @Column({type: 'varchar', length: 255, unique: true})
    name_en: string;

    @Column({type: 'varchar', length: 255, unique: true})
    name_ru: string;

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

    @ManyToOne(() => AutopartGroup, group => group.partNames )
    @JoinColumn({name: 'group_id'})
    autopart_group: AutopartGroup;
}     