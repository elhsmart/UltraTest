import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { PublisherService } from '../publisher/publisher.service';
import { GameController } from './game.controller';
import { Game } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsPublisherAlreadyExist } from '../publisher/validators';
import { Publisher } from '../publisher/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Publisher]),
  ],
  controllers: [GameController],
  providers: [
    IsPublisherAlreadyExist,
     GameService,
      PublisherService
    ]
})
export class GameModule {}
