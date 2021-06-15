import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Index({ unique: true })
  @Column('varchar', { length: 100, nullable: true, unique: true })
  username!: string;

  @Column('varchar', { length: 100, nullable: true })
  password!: string;

  @Column('varchar', { length: 100, nullable: true })
  firstName?: string;

  @Column('varchar', { length: 100, nullable: true })
  lastName?: string;
}
