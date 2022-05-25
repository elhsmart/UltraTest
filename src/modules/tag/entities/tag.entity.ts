import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  // 0-99% discount value
  @Column({ type: 'varchar', length: 32, unique: true, nullable: false })
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;
}
