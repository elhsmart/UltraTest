import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService]
})
export class TagModule {}
