// user.entity.ts - Fichier généré automatiquement
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../shared/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.EMPLOYE })
  role: Role;
}