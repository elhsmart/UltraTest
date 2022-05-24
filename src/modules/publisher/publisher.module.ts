import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublisherService]
})
export class PublisherModule {}
