import {Entity, PrimaryGeneratedColumn, Column, Index, getRepository, ObjectID} from "typeorm";

@Entity({ name: 'product' })
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;
    @Index({unique: true})

    @Column('varchar', { length: 100, nullable: true })
    displayName!: string;

    @Column()
    categoryIds!: ObjectID[];

    @Column({ type: "timestamptz", default: "now()" })
    createdAt:  Date = new Date();

    @Column()
    totalRating!: number;

    @Column()
    price!: number;
}