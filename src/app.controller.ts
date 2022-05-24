import { Controller, Get } from '@nestjs/common';
import { ApiVersion, AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiVersion(): ApiVersion {
    return this.appService.getApiVersion();
  }
}