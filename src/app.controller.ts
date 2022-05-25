import { Controller, Get } from '@nestjs/common';
import { ApiVersion, AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('ultratest-queue') private queue: Queue,
  ) {}

  @Get()
  getApiVersion(): ApiVersion {
    return this.appService.getApiVersion();
  }

  @Get('run-discounting')
  async runDiscounting() {
    let res = await this.queue.add('run-discounting', { testpayload: 'test' });
    console.log('PUT DISCOUNTS JOB PAYLOAD');
    console.log(res);
    return {
      status: 'ok',
    };
  }
}
