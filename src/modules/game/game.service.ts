import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { Pagination, PaginationOptionsInterface } from './../pagination';


@Injectable()
export class GameService {
  @InjectRepository(Game)
  private readonly repository: Repository<Game>;

  async create(createGameDto: CreateGameDto) {
    const game: Game = new Game();

    game.title = createGameDto.title;
    game.price = createGameDto.price;
    game.releaseDate = createGameDto.releaseDate;

    return this.repository.save(game);
  }

  async save(game: Game) {
    return this.repository.save(game);
  }

  async findAll(options: PaginationOptionsInterface,
    ): Promise<Pagination<Game>> {
      const [results, total] = await this.repository.findAndCount({
        take: options.limit,
        skip: options.offset
      });
      let limit = results.length;
  
      return new Pagination<Game>({
        results,
        total,
        limit
      });
  }

  findOne(id: number) { 
    return this.repository.findOneOrFail({
      where: {id: id}
    });
  }

  findOneWithTags(id: number) {
    return this.repository.findOneOrFail({
      where: {id: id},
      relations: {
        tag: true,
      }
    });
  }

  findOneWithPublisher(id: number) {
    return this.repository.findOneOrFail({
      where: {id: id},
      relations: {
        publisher: true
      }
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
