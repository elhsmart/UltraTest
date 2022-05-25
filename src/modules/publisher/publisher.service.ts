import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PublisherService {
  @InjectRepository(Publisher)
  private readonly repository: Repository<Publisher>;

  async findOneById(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }
}
