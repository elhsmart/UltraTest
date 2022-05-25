import { PublicGameDto } from './public-game.dto';

export class PublicGamesDto {
  results: PublicGameDto[];
  limit: number;
  count: number;
}
