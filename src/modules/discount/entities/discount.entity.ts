import { 
    PrimaryGeneratedColumn, 
    CreateDateColumn,
    Column, 
    Entity,
} from 'typeorm';

@Entity('discounts')
export class Discount {
    @PrimaryGeneratedColumn()
    id: number;

    // 0-99% discount value
    @Column({ type: 'decimal', precision: 2, scale: 0, default: 0 })
    value: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt: Date;
}