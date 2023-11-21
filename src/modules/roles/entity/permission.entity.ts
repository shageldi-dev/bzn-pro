import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleActions, RoleSubjects } from '../roles.constant';
import RoleEntity from './role.entity';

@Entity()
export default class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleActions })
  action: string;

  @Column({ type: 'enum', enum: RoleSubjects })
  subject: string;

  @ManyToOne(() => RoleEntity, (role) => role.permissions)
  role: RoleEntity;

  @Column({ type: 'text', default: 'This action not permited' })
  error_message: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'int' })
  roleId: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
