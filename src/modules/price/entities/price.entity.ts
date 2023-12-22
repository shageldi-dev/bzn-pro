import { Autopart } from "src/modules/autoparts/entities/autopart.entity";
import { User } from "src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Price {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    autopart_id: number;

    @Column({nullable: true})
    created_by: number;     

    @Column({nullable: true})
    updated_by: number;

    @Column({type: 'double precision'})
    price: number;

    @Column({type: 'double precision', nullable: true})
    old_price: number;

    @Column({type: "double precision"})
    sale_price: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    created_at: Date;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updated_at: Date;

    @OneToOne(() => Autopart, autopart => autopart.price, { onDelete: 'CASCADE'})
    @JoinColumn({name: ''})
    autopart: Autopart;       
    
    @ManyToOne(() => User, null, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'created_by'})
    creator: User;

    @ManyToOne(() => User, null, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'updated_by'})
    updater: User;             
}
  