import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  teamName: string;

  @Column({ nullable: true })
  email: string;
}
