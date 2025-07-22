import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Formation } from './formation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'rh' | 'user';

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Formation, formation => formation.users, { cascade: true })
  formations: Formation[];
}
