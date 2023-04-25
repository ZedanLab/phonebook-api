import 'reflect-metadata';
import { DataSource, LoggerOptions } from 'typeorm';
import { config } from '../config';

export const DB = new DataSource({
  type: config.database.type as any,
  host: config.database.host,
  port: parseInt(config.database.port),
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.database.synchronize as unknown as boolean,
  logging: config.database.logging as LoggerOptions,
  entities: [`${__dirname}/../models/*.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  migrationsTableName: "migrations",
});
