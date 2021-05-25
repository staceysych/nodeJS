import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { Category } from './CategoryTypeOrmSchema';
@Entity({ name: 'product' })
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;
    @Index({unique: true})

    @Column('varchar', { length: 100, nullable: true })
    display_name!: string;

    @Column("int", { array: true })
    @OneToMany(() => Category, category => category.id)
    category_ids!: Category[];

    @Column({ type: "timestamp", default: "now()" })
    created_at:  Date = new Date();

    @Column()
    total_rating!: number;

    @Column()
    price!: number;
}