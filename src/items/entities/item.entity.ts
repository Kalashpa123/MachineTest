// src/items/entities/item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
