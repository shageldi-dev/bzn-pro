import { User } from "src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Section } from "./section.entity";

@Entity()
export class Storage {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: '255'})
    name_tm: string;

    @Column({type: 'varchar', length: '255'})
    name_en: string;

    @Column({type: 'varchar', length: '255'})
    name_ru: string;

    @Column({type: 'varchar', length: '255', nullable: true})
    website: string;

    @Column({type: 'varchar', length: '100'})
    phone: string;

    @Column({type: 'varchar', length: '20'})
    abbr: string;

    @Column({type: 'text'})
    description_tm: string;
    
    @Column({type: 'text'})
    description_en: string;

    @Column({type: 'text'})
    description_ru: string;

    @Column({type: 'varchar', length: '100', nullable: true})
    bar_code_prefix: string; 

    @Column({default: false})
    is_hidden: boolean;

    @Column({default: false})
    is_issue_point: boolean;

    @Column({default: false})
    is_income_point: boolean;

    @Column()
    created_by: number;

    @Column({nullable: true})
    updated_by: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updated_at: Date;

    @ManyToOne(() => User, user => user.craeted_storages)
    @JoinColumn({name: 'created_by'})
    creator: User;

    @ManyToOne(() => User, user => user.updated_storages)
    @JoinColumn({name: 'updated_by'})
    updater: User;   

    @OneToMany(() => Section, section => section.storage)
    sections: Section[];
}