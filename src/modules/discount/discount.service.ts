import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities';

@Injectable()
export class DiscountService {
  @InjectRepository(Discount)
  private readonly repository: Repository<Discount>;

  async findOneByGame(id: number) {
    return await this.repository.findOne({
      where: {
        game: { id: id },
      },
    });
  }
}
