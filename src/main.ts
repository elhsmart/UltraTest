import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from "class-validator";
import { MysqlErrorFilter } from './filters';
import { NotFoundFilter } from './filters/not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new MysqlErrorFilter(), new NotFoundFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
