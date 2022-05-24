import { UsePipes, Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PublisherService } from '../publisher/publisher.service';
import { TagService } from '../tag/tag.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService, 
              private readonly publisherService: PublisherService,
              private readonly tagSevice: TagService) {}

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
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
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
