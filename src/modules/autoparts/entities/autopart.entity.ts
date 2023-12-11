import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsUsed } from "../enums/isused.enum";
import { FrontBack, Side } from "../enums/side.enum";
import { Status } from "../enums/status.enum";
import { Brand } from "../../car-options/entities/brand.entity";
import { Model } from "../../car-options/entities/model.entity";
import { Generation } from "../../car-options/entities/generation.entity";
import { Manufacturer } from "./manufacturer.entity";
import { Image } from "./image.entity";
import { Category } from "src/modules/categories/entities/category.entity";

@Entity()
export class Autopart { 

    /* FOREIGN KEYS */
    
    @PrimaryGeneratedColumn()
    autopart_id: number;
    
    @Column({nullable: true})
    brand_id: number;

    @Column({nullable: true})
    model_id: number;

    @Column({nullable: true})
    generation_id: number;

    @Column({nullable: true})
    category_id: number;


    @Column({nullable: true})
    manufacturer_id: number;

    /* END FOREIGN KEYS */

    /* REQUIRED COLUMNS */

    @Column()
    name: string;

    /* NULLABLE COLUMNS */

    @Column({nullable: true, type: 'enum', enum: FrontBack})
    front_back: FrontBack;

    @Column({nullable: true, type: 'enum', enum: Side})
    left_right: Side;

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
    

    /* RELATIONSHIPS */    

    @ManyToOne(() => Brand, brand => brand.autoparts)
    @JoinColumn({name: 'brand_id'}) 
    brand: Brand;

    @ManyToOne(() => Model, model => model.autoparts) 
    @JoinColumn({name: 'model_id'})
    model: Model

    @ManyToOne(() => Generation, generation => generation.autoparts)
    @JoinColumn({name: 'generation_id'})
    generation: Generation
   
    @ManyToOne(() => Manufacturer, manufacturer => manufacturer.autoparts)
    @JoinColumn({name: 'manufacturer_id'})
    manufacturer: Manufacturer;

    @ManyToOne(() => Category, category => category.autoparts)
    @JoinColumn({name: 'category_id'})
    category: Category;

    @OneToMany(() => Image, image => image.autopart)
    images: Image[];
}
