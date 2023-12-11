import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autopart } from "./autopart.entity";

@Entity()
export class Image {
    
    @PrimaryGeneratedColumn()
    image_id: number;

    @Column()
    autopart_id: number;

    @Column({type: 'varchar', 'length': 255})
    src_original: string;

    @Column({type: 'varchar', 'length': 255, nullable: true})
    src_small : string;

    @Column({type: 'varchar', 'length': 255, nullable: true})
    blurhash: string;

    @Column({nullable: true})
    width: number;

    @Column({nullable: true})
    height: number;

    @Column({nullable: true})
    is_main: boolean;

    @ManyToOne(() => Autopart, autopart => autopart.images, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: "autopart_id"})
    autopart: Autopart;
}