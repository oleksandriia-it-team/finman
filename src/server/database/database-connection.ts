import 'reflect-metadata';

import { DataSource, type DataSourceOptions } from 'typeorm';
import { Migrations } from './migrations';
import { Entities } from './entities';
import { EnvConfigConstant } from '@backend/config/env-config.constant';
import { isDevMode } from '@common/utils/is-dev-mode.util';

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

const globalForTypeorm = global as unknown as { typeorm: DataSource };

let instance: DataSource | null = null;
const getDataSource = (): DataSource => {
  if (globalForTypeorm.typeorm) return globalForTypeorm.typeorm;
  if (instance) return instance;
  instance = new DataSource(buildDataSourceOptions());
  if (isDevMode()) {
    globalForTypeorm.typeorm = instance;
  }
  return instance;
};

export const DBDataSource: DataSource = new Proxy({} as DataSource, {
  get: (_, prop) => Reflect.get(getDataSource(), prop, getDataSource()),
  set: (_, prop, value) => Reflect.set(getDataSource(), prop, value),
});
