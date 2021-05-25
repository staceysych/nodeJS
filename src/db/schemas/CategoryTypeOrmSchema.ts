import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: 'category' })
export class Category {

    @PrimaryGeneratedColumn()
    id!: number;
    @Index({unique: true})

    @Column('varchar', { length: 100, nullable: true })
    display_name!: string;
}