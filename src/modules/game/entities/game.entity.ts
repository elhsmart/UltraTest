import { Publisher } from 'src/modules/publisher/entities';
import { Tag } from 'src/modules/tag/entities';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true, nullable: false })
  title: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'date' })
  releaseDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(() => Publisher)
  publisher: Publisher;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tag: Tag[];
}
