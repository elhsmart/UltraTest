import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { TagService } from '../tag/tag.service';
import { PublisherService } from '../publisher/publisher.service';
import { GameController } from './game.controller';
import { Game } from './entities/game.entity';
import { Tag } from '../tag/entities';
import { Publisher } from '../publisher/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsPublisherAlreadyExist } from '../publisher/validators';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Publisher]),
    TypeOrmModule.forFeature([Tag]),
  ],
  controllers: [GameController],
  providers: [
    IsPublisherAlreadyExist,
    GameService,
    PublisherService,
    TagService
  ]
})
export class GameModule {}
