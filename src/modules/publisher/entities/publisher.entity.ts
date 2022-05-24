import { 
     PrimaryGeneratedColumn, 
     CreateDateColumn,
     Column, 
     Entity,
} from 'typeorm';

@Entity('publishers')
export class Publisher {
     @PrimaryGeneratedColumn()
     id: number;

     @Column({ type: 'varchar', length: 128, default: '', nullable: true })
     name: string;

     @Column({ type: 'varchar', length: 14, default: '', nullable: true  })
     siret: string;

     @Column({ type: 'varchar', length: 16, default: '', nullable: true })
     phone: string;

     @CreateDateColumn({ type: 'timestamp' })
     public createdAt: Date;     
}