import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  // --- Owner Relationship ---
  @Column()
  ownerId!: string; // Explicit Foreign Key column

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'ownerId' }) // Link relation to the column above
  owner!: User;

  // --- Category Relationship ---
  @Column()
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.associatedProducts)
  @JoinColumn({ name: 'categoryId' }) // Link relation to the column above
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

//Since you're on the frontend too, once this backend change is made,
// your product creation form will need a dropdown or a selection tool that pulls from your
// findAll categories endpoint. You'll be sending the id from that selection to the backend.
