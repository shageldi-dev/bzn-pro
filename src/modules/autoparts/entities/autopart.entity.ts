import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsUsed } from "../enums/isused.enum";
import { FrontBack, Side } from "../enums/side.enum";
import { Status } from "../enums/status.enum";
import { CarOption } from "./car-option.entity";

@Entity()
export class Autopart { 
    
    @PrimaryGeneratedColumn()
    autopart_id: number;
    
    @Column({nullable: true})
    brand_id: number;

    @Column({nullable: true})
    model_id: number;

    @Column({nullable: true})
    generation_id: number;

    @Column({nullable: true})
    genversion_id: number;

    @Column({nullable: true})
    body_id: number;

    @Column({nullable: true})
    engine_id: number;

    @Column({nullable: true})
    manufacturer_id: number;

    @Column()
    name: string;

    @Column({nullable: true, type: 'enum', enum: FrontBack})
    front_back: FrontBack;

    @Column({nullable: true, type: 'enum', enum: Side})
    left_right: Side;



    // category_id: number;

    @Column({nullable: true})
    number_of_part: number;

    @Column({nullable: true})
    year: number;

    @Column({nullable: true})
    color: string;

    @Column({nullable: true})
    comment: string;

    @Column({nullable: true})
    cross_number: number;

    @Column({nullable: true})
    note: string; 

    @Column({nullable: true})
    marking: string;

    @Column({default: false})
    is_archive: boolean;

    @Column({default: false})
    not_for_export: boolean; 

    @Column({nullable: true})
    site_link: string;
    // partname_id: number;  

    @Column({nullable: true})
    video: string;

    @Column({ nullable: true })
    old_bar_code: string;

    @Column({ nullable: true })
    old_data: string; 

    @Column({
        type: 'enum',
        enum: IsUsed,
        default: IsUsed.NEW
    })
    is_used: IsUsed;  

    @Column({ type: 'enum', enum: Status, })
    status: string;
    
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP '})
    updated_at: Date;
    

    @ManyToOne(() => CarOption, carOption => carOption.autoParts)
    @JoinColumn({name: 'brand_id'})
    carOption: CarOption

    

    
    @ManyToOne(() => CarOption, carOption => carOption.autoParts)
    @JoinColumn({name: 'model_id'})
    model: CarOption

    
    @ManyToOne(() => CarOption, carOption => carOption.autoParts)
    @JoinColumn({name: 'generation_id'})
    generation: CarOption

    @ManyToOne(() => CarOption, carOption => carOption.autoParts)
    @JoinColumn({name: 'genversion_id'})
    genVersion: CarOption

    @ManyToOne(() => CarOption, carOption => carOption.autoParts)
    @JoinColumn({name: 'body_id'})
    body: CarOption

    @ManyToOne(() => CarOption, carOption => carOption.autoParts)
    @JoinColumn({name: 'engine_id'})
    engine: CarOption
}
