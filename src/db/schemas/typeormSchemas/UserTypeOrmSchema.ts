import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    id!: number;
    @Index({unique: true})

    @Column('varchar', { length: 100, nullable: true, unique: true })
    email!: string;

    @Column('varchar', { length: 100, nullable: true })
    password!: string;
}