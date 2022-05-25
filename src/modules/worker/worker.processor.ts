import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Repository, Raw, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Game } from '../game/entities/game.entity';
import { ConfigService } from '@nestjs/config';
import { Discount } from '../discount/entities';

@Processor('ultratest-queue')
export class WorkerProcessor {
  @InjectRepository(Game)
  private readonly gameRepository: Repository<Game>;

  @InjectRepository(Discount)
  private readonly discountRepository: Repository<Discount>;
  private readonly logger = new Logger(WorkerProcessor.name);

  constructor(private readonly configService: ConfigService) {}

  @Process('run-discounting')
  async handleDiscounts(job: Job) {
    this.logger.debug('Start background Games check...');
    let dropDateMonthInterval =
      this.configService.get<number>('GAMES_DROP_MONTHS');
    let discountDateMonthInterval = this.configService.get<number>(
      'GAMES_DISCOUNT_MONTHS',
    );

    this.logger.debug('Checking games older than 12 months');
    try {
      var discountGames = await this.gameRepository.find({
        where: {
          releaseDate: Raw(
            (alias) =>
              `${alias} < (NOW() - INTERVAL ${discountDateMonthInterval} MONTH)`,
          ),
        },
      });
    } catch (e) {
      console.log(e);
    }

    if (discountGames.length > 0) {
      this.logger.debug(
        'Games to be discounted:',
        discountGames.map((game) => game.id + ':' + game.title),
      );

      for (let game in discountGames) {
        // check if discount exist
        let discount = new Discount();
        discount.game = discountGames[game];
        discount.value = this.configService.get<string>('GAMES_DISCOUNT_VALUE');
        let searchDiscount = await this.discountRepository.find({
          where: {
            game: { id: discountGames[game].id },
          },
        });
        if (searchDiscount.length == 0) {
          await this.discountRepository.save(discount);
        }
      }
    }

    this.logger.debug('Checking games older than 18 months');
    let deletedGames = await this.gameRepository.find({
      where: {
        releaseDate: Raw(
          (alias) =>
            `${alias} < (NOW() - INTERVAL ${dropDateMonthInterval} MONTH)`,
        ),
      },
    });
    if (deletedGames.length > 0) {
      try {
        this.logger.debug(
          'Games to be removed:',
          deletedGames.map((game) => game.id + ':' + game.title),
        );

        let discounts = await this.discountRepository.find({
          where: {
            game: In(deletedGames),
          },
        });
        await this.discountRepository.remove(discounts);
        for (let game in deletedGames) {
          await this.gameRepository.remove(deletedGames[game]);
        }
      } catch (e) {
        this.logger.debug(e);
      }
    }

    this.logger.debug('Background task completed');
  }
}
