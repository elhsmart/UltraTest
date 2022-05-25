import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { WorkerProcessor } from './worker.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../game/entities/game.entity';
import { Discount } from '../discount/entities';

@Module({
    imports: [
      TypeOrmModule.forFeature([Game]),
      TypeOrmModule.forFeature([Discount]),
      BullModule.registerQueue({
        name: 'ultratest-queue',
        redis: {
          host: 'redis',
          port: 6379,
        },
      })
    ],
    providers: [WorkerProcessor],

  })
export class WorkerModule {}
