import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class GameService {
  @InjectRepository(Game)
  private readonly repository: Repository<Game>;

  async create(createGameDto: CreateGameDto) {
    console.log(createGameDto);
    const game: Game = new Game();

    game.title = createGameDto.title;
    game.price = createGameDto.price;
    game.releaseDate = createGameDto.releaseDate;

    return this.repository.save(game);
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
