import 'reflect-metadata';

import { DataSource, type DataSourceOptions } from 'typeorm';
import { Migrations } from './migrations';
import { Entities } from './entities';
import { EnvConfigConstant } from '@backend/config/env-config.constant';

const args = process.argv.slice(2);
const synchronize = args.includes('--synchronize=true');

const buildDataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  host: EnvConfigConstant.DB_HOST,
  port: EnvConfigConstant.DB_PORT,
  username: EnvConfigConstant.DB_USERNAME,
  password: EnvConfigConstant.DB_PASSWORD,
  database: EnvConfigConstant.DB_DATABASE,
  entities: Entities,
  migrations: synchronize ? [] : Migrations,
  migrationsRun: false,
  synchronize,
  logging: true,
  schema: 'public',
});

const globalForTypeorm = globalThis as unknown as { __finmanDataSource?: DataSource };

const getDataSource = (): DataSource => {
  if (!globalForTypeorm.__finmanDataSource) {
    globalForTypeorm.__finmanDataSource = new DataSource(buildDataSourceOptions());
  }
  return globalForTypeorm.__finmanDataSource;
};

export const DBDataSource: DataSource = new Proxy({} as DataSource, {
  get: (_, prop) => Reflect.get(getDataSource(), prop, getDataSource()),
  set: (_, prop, value) => Reflect.set(getDataSource(), prop, value),
});
