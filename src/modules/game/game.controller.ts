import { UsePipes, Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, Request, NotFoundException, Inject} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PublisherService } from '../publisher/publisher.service';
import { TagService } from '../tag/tag.service';
import { Pagination } from '../pagination';
import { Game } from './entities/game.entity';
import { ConfigService } from '@nestjs/config';
import { GameMapper } from './game.mapper';
import { DiscountService } from '../discount/discount.service';


@Controller('game')
export class GameController {
  @Inject(GameMapper)
  private gameMapper: GameMapper;
  constructor(private readonly gameService: GameService, 
              private readonly publisherService: PublisherService,
              private readonly tagSevice: TagService,
              private readonly discountService: DiscountService,
              private readonly configService: ConfigService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    let publisher: any;
    let game: any;

    if(createGameDto.publisherId) {
      publisher = await this.publisherService.findOneById(createGameDto.publisherId);

      if (!publisher) {
        throw new NotFoundException(`Publisher with id: ${createGameDto.publisherId} not found.`);
      }
    }
    game = await this.gameService.create(createGameDto);
    
    if(createGameDto.publisherId) {
      game.publisher = publisher;
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
  async getAll(@Request() request) {
    let configPaginationLimit = this.configService.get<number>('PAGINATION_LIMIT') ? this.configService.get<number>('PAGINATION_LIMIT') : 10;
    let configPaginationOffset = this.configService.get<number>('PAGINATION_OFFSET') ? this.configService.get<number>('PAGINATION_OFFSET') : 0;

    let result = await this.gameService.findAll({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : configPaginationLimit,
      offset: request.query.hasOwnProperty('offset') ? request.query.offset : configPaginationOffset,
    });

    let presentationResult = [];
    for(let res in result.results) {
      presentationResult.push(this.gameMapper.mapFrom(result.results[res], await this.discountService.findOneByGame(result.results[res].id)));
    }
    let presentation = {
      results: presentationResult,
      total: result.total,
      limit: result.limit
    }

    return presentation;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let result = await this.gameService.findOneWithTags(+id);
    let presentation = this.gameMapper.mapFrom(result, await this.discountService.findOneByGame(result.id));
    return presentation;
  }

  @Get(':id/publisher')
  async findGamePublisher(@Param('id') id: string) {
    let game = await this.gameService.findOneWithPublisher(+id);
    if(!game.publisher) {
      throw new NotFoundException(`Publisher for Game with id :${game.id} not found.`);
    }

    return game.publisher;
  }  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    let publisher: any = null;
    let game = await this.gameService.findOne(+id);

    if(updateGameDto.publisherId) {
      publisher = await this.publisherService.findOneById(updateGameDto.publisherId);
    } 

    if(!game) {
      throw new NotFoundException(`Game with id :${game.id} not found.`);
    }

    game = await this.gameService.update(game.id, updateGameDto);

    if(publisher) {
      game.publisher = publisher;
      await this.gameService.save(game);      
    }

    if(updateGameDto.tag) {
      game.tag = await this.tagSevice.findOrCreate(
        updateGameDto.tag
            .split(",")
            .map(tagName => (tagName.trim()))
        );
        await this.gameService.save(game);
    }

    return game;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let game = await this.gameService.findOneWithTags(+id);
    return this.gameService.remove(+id);
  }
}
