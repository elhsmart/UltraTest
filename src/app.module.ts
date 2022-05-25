import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublisherModule } from './modules/publisher/publisher.module';
import { typeOrmModuleOptions } from './config/orm.config';
import { TagModule } from './modules/tag/tag.module';
import { DiscountModule } from './modules/discount/discount.module';
import { GameModule } from './modules/game/game.module';
import { BullModule } from '@nestjs/bull';
import { WorkerModule } from './modules/worker/worker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
          ...typeOrmModuleOptions
      })
    }),
    BullModule.registerQueue({
      name: 'ultratest-queue',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    PublisherModule,
    TagModule,
    DiscountModule,
    GameModule,
    WorkerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
