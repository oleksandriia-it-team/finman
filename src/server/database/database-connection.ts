import { DataSource } from 'typeorm';
import { Migrations } from './migrations';
import { Entities } from './entities';
import { EnvConfigConstant } from '../../common/constants/env-config.constant';

const DBDataSource = new DataSource({
  type: 'postgres',
  host: EnvConfigConstant.DB_HOST,
  port: Number(EnvConfigConstant.DB_PORT),
  username: EnvConfigConstant.DB_USERNAME,
  password: EnvConfigConstant.DB_PASSWORD,
  database: EnvConfigConstant.DB_DATABASE,
  entities: Entities,
  migrations: Migrations,
  migrationsRun: true,
  synchronize: true,
});

DBDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default DBDataSource;
