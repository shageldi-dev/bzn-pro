import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SectionType } from "../enums/section.enum";
import { Storage } from "./storage.entity";
import { AutopartGroup } from "src/modules/autoparts/entities/autopart_group.entity";

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    parent_id: number;
 
    @Column({nullable: true})
    autoart_group_id: number;

    @Column()
    storage_id: number;

    @Column({type: 'varchar', length: 255})
    name_tm: string;

    @Column({type: 'varchar', length: 255})
    name_en: string;

    @Column({type: 'varchar', length: 255})
    name_ru: string;

    @Column({nullable: true})
    section_number: number;

    @Column({
        type: 'enum',
        enum: SectionType
    })
    section_type: SectionType;

    @Column({nullable: true})
    space_count: number;

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



    /* ******** RELATIONS ******** */
    
    @ManyToOne(() => Section, section => section.children)
    @JoinColumn({name: 'parent_id'}) 
    parent: Section;
 
    @OneToMany(() => Section, section => section.parent)
    children: Section[];

    @ManyToOne(() => Storage, storage => storage.sections)
    @JoinColumn({name: 'storage_id'})
    storage: Storage;

    @ManyToOne(() => AutopartGroup, group => group.sections)
    @JoinColumn({name: 'autoart_group_id'})
    autopart_group: AutopartGroup;
} 