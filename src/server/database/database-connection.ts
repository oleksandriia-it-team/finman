import { DataSource } from 'typeorm';
import { Migrations } from './migrations';
import { Entities } from './entities';
import { EnvConfigConstant } from '../../common/constants/env-config.constant';

const dataSourceOptions = {
  type: 'postgres',
  host: EnvConfigConstant.DB_HOST,
  port: Number(EnvConfigConstant.DB_PORT),
  username: EnvConfigConstant.DB_USERNAME,
  password: EnvConfigConstant.DB_PASSWORD,
  database: EnvConfigConstant.DB_DATABASE,
  entities: Entities,
  migrations: Migrations,
  migrationsRun: true,
  // synchronize: true,
  logging: true,
};

const globalForTypeorm = global as unknown as { typeorm: DataSource };

export const DBDataSource = globalForTypeorm.typeorm || new DataSource(dataSourceOptions);

/*
Prevents multiple database connections during Next.js Hot Module Replacement (HMR).
By caching the DataSource in the global scope, we ensure a single connection persists across development reloads,
avoiding 'Too many connections' errors
*/
if (process.env.NODE_ENV !== 'production') {
  globalForTypeorm.typeorm = DBDataSource;
}

export default DBDataSource;
