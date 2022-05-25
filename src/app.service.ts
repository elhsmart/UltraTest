import { Injectable } from '@nestjs/common';

export interface ApiVersion {
  title: string;
  version: string;
  status: string;
}

@Injectable()
export class AppService {
  private status: ApiVersion = {
    title: 'Games API',
    version: '0.1',
    status: 'ok',
  };

  getApiVersion(): ApiVersion {
    return this.status;
  }
}
