import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MysqlErrorFilter } from './../src/filters';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new MysqlErrorFilter());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    
    await app.init();
  });


  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('{"title":"Games API","version":"0.1","status":"ok"}');
  });

  it('/game (POST) expect to create new game entity', () => {
    return request(app.getHttpServer())
      .post('/game')
      .expect(200)
  });  
});
