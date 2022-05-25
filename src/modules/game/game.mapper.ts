import { Injectable, Inject } from '@nestjs/common';
import { Discount } from '../discount/entities';
import { Mapper } from '../mapper';
import { TagMapper } from '../tag/tag.mapper';
import { DiscountMapper } from '../discount/discount.mapper';
import { PublicGameDto } from './dto/public-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameMapper extends Mapper<PublicGameDto, Game> {
  @Inject(TagMapper)
  private tagMapper: TagMapper;
  @Inject(DiscountMapper)
  private discountMapper: DiscountMapper;

  public mapFrom(data: Game, discount?: Discount): PublicGameDto {
    const game = new PublicGameDto();
    game.id = data.id;
    game.price = Number(data.price);
    game.title = data.title;
    game.releaseDate = data.releaseDate;
    game.createdAt = data.createdAt;
    game.updatedAt = data.updatedAt;

    if (discount instanceof Discount) {
      game.discount = this.discountMapper.mapFrom(discount);
      game.price = game.price - (game.price / 100) * game.discount.value;
    }
    if (data.tag) {
      game.tag = data.tag.map((tag) => this.tagMapper.mapFrom(tag));
    }
    return game;
  }

  public mapTo(data: PublicGameDto): Game {
    const game = new Game();

    return game;
  }
}
