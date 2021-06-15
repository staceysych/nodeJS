import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Product } from './ProductTypeOrmSchema';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column('varchar', { length: 100, nullable: true })
  display_name!: string;

  @Column('json', { array: true, nullable: true, select: false })
  @OneToMany(() => Product, (product) => product)
  products!: Product[];
}
