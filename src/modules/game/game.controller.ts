import { UsePipes, Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, NotFoundException} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PublisherService } from '../publisher/publisher.service';
import { TagService } from '../tag/tag.service';
import { Pagination } from '../pagination';
import { Game } from './entities/game.entity';
import { ConfigService } from '@nestjs/config';


@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService, 
              private readonly publisherService: PublisherService,
              private readonly tagSevice: TagService,
              private readonly configService: ConfigService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    let game = await this.gameService.create(createGameDto);
    
    if(createGameDto.publisherId) {
      game.publisher = await this.publisherService.findOneById(createGameDto.publisherId);
      await this.gameService.save(game);
    }

    if(createGameDto.tag) {
      game.tag = await this.tagSevice.findOrCreate(
          createGameDto.tag
            .split(",")
            .map(tagName => (tagName.trim()))
        );
        await this.gameService.save(game);
    }

    return game;
  }

  @Get()
  async getAll(@Request() request): Promise<Pagination<Game>> {
    let configPaginationLimit = this.configService.get<number>('PAGINATION_LIMIT') ? this.configService.get<number>('PAGINATION_LIMIT') : 10;
    let configPaginationOffset = this.configService.get<number>('PAGINATION_OFFSET') ? this.configService.get<number>('PAGINATION_OFFSET') : 0;
    return await this.gameService.findAll({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : configPaginationLimit,
      offset: request.query.hasOwnProperty('offset') ? request.query.offset : configPaginationOffset,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Get(':id/publisher')
  async findGamePublisher(@Param('id') id: string) {
    let game = await this.gameService.findOneWithPublisher(+id);
    if(game.publisher == null) {
      throw new NotFoundException(`Publisher for Game with id :${game.id} not found.`);
    }
    return game.publisher;
  }  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
