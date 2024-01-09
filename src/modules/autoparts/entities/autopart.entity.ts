import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsUsed } from "../enums/isused.enum";
import { FrontBack, Side } from "../enums/side.enum";
import { Status } from "../enums/status.enum";
import { Brand } from "../../car-options/entities/brand.entity";
import { Model } from "../../car-options/entities/model.entity";
import { Generation } from "../../car-options/entities/generation.entity";
import { Manufacturer } from "../../car-options/entities/manufacturer.entity";
import { Image } from "./image.entity";
import { Category } from "src/modules/categories/entities/category.entity";
import { Price } from "src/modules/price/entities/price.entity";
import { Length, Max, Min } from "class-validator";

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

    @Column({nullable: true})
    price_id: number;

    /* END FOREIGN KEYS */

    /* REQUIRED COLUMNS */

    @Column()
    name: string;

    /* NULLABLE COLUMNS */

    @Column({nullable: true})
    color: string;

    @Column({nullable: true})
    comment: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    cross_number: string;

    @Column({default: false})
    is_archive: boolean;

    @Column({
        type: 'enum',
        enum: IsUsed,
        default: IsUsed.NEW
    })
    is_used: IsUsed; 

    @Column({nullable: true, type: 'enum', enum: FrontBack})
    front_back: FrontBack;

    @Column({nullable: true, type: 'enum', enum: Side})
    left_right: Side;

    @Column({type: 'varchar', length: 100, nullable: true})
    manufacturer_no: string;

    @Column({nullable: true})
    marking: string;

    @Column({nullable: true})
    note: string; 

    @Column({default: false})
    not_for_export: boolean; 

    @Column({nullable: true})
    number_of_part: number;

    @Column({ nullable: true })
    old_bar_code: string;

    @Column({ nullable: true })
    old_data: string; 

    @Column({nullable: true})
    site_link: string;

    @Column({ type: 'enum', enum: Status, nullable: true})
    status: Status;

    @Column({nullable: true})
    year: number;
    
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP '})
    updated_at: Date;
    

    /* RELATIONSHIPS */    

    @ManyToOne(() => Brand, brand => brand.autoparts)
    @JoinColumn({name: 'brand_id', referencedColumnName: "id", foreignKeyConstraintName: "fk_autopart_brand_id"}) 
    brand: Brand;

    @ManyToOne(() => Model, model => model.autoparts) 
    @JoinColumn({name: 'model_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_autopart_model_id'})
    model: Model

    @ManyToOne(() => Generation, generation => generation.autoparts)
    @JoinColumn({name: 'generation_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_autopart_generation_id'})
    generation: Generation
   
    @ManyToOne(() => Manufacturer, manufacturer => manufacturer.autoparts)
    @JoinColumn({name: 'manufacturer_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_autopart_manufacturer_id'})
    manufacturer: Manufacturer;

    @ManyToOne(() => Category, category => category.autoparts)
    @JoinColumn({name: 'category_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_autopart_category_id'})
    category: Category;

    @OneToMany(() => Image, image => image.autopart)
    images: Image[];

    @OneToOne(() => Price, price => price.autopart)
    @JoinColumn({name: 'price_id '})
    price: Price;
}
  

