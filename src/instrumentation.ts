import DBDataSource from '@backend/database/database-connection';

export async function register() {
  DBDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}
