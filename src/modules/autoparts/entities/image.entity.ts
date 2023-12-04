import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ImageSize } from "../enums/image-size.enum";

@Entity()
export class Image {
    
    @PrimaryGeneratedColumn()
    image_id: number;

    @Column()
    autopart_id: number;

    @Column({type: 'varchar', 'length': 255})
    src: string;

    @Column({type: 'varchar', 'length': 255})
    blurhash: string;

    @Column()
    width: number;

    @Column()
    height: number;

    @Column({type: 'enum', enum: ImageSize})
    image_type: ImageSize;

    @Column()
    is_main: boolean;
}