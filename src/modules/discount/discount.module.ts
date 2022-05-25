import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountService } from './discount.service';
import { Discount } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discount]),
  ],
  providers: [DiscountService]
})
export class DiscountModule {}
