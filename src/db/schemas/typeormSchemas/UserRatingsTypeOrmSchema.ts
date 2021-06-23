import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user_ratings' })
export class UserRatings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 100, nullable: true })
  username!: string;

  @Column({ type: 'int', nullable: true })
  productId!: number;

  @Column({ type: 'decimal', nullable: true })
  rating!: number;

  @Column('varchar', { length: 100, nullable: true })
  comment?: string;
}
