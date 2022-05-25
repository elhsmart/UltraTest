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
import { GameMapper } from './game.mapper';
import { TagMapper } from '../tag/tag.mapper';
import { DiscountMapper } from '../discount/discount.mapper';
import { DiscountService } from '../discount/discount.service';
import { Discount } from '../discount/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([Publisher]),
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([Discount]),
  ],
  controllers: [GameController],
  providers: [
    IsPublisherAlreadyExist,
    GameService,
    PublisherService,
    TagService,
    DiscountService,
    GameMapper,
    TagMapper,
    DiscountMapper
  ]
})
export class GameModule {}
