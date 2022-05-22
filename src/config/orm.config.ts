import { DataSource } from "typeorm"
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';

// We need .env variables here
ConfigModule.forRoot();

export const typeOrmModuleOptions:TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST, 
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [ __dirname + '/../**/entities/*.entity.{ts,js}' ],
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}

export const connectionSource = new DataSource({
    type: 'mysql',
    name: 'default',
    migrationsTableName: 'migrations',
    host: process.env.MYSQL_HOST, 
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [ __dirname + '/../**/entities/*.entity.{ts,js}'],
    migrations: [ __dirname + '/../**/migrations/**/*{.ts,.js}'],
    synchronize: false,
    logging: false
});