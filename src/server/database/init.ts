import 'dotenv/config';

import { countriesAndLocalesSeeder } from './seeders/countries-and-locales.seeder';
import { currencySeeder } from './seeders/currency.seeder';
import { userSeeder } from '@backend/database/seeders/users.seeder';

async function init() {
  const { DBDataSource } = await import('./database-connection');

  try {
    if (!DBDataSource.isInitialized) {
      await DBDataSource.initialize();
      console.log('Database connected via DBDataSource');
    }

    await Promise.all([countriesAndLocalesSeeder(), currencySeeder(), userSeeder()]);

    console.log('Done!');
  } catch (error) {
    console.error('Real connection error:', error);
  } finally {
    if (DBDataSource.isInitialized) {
      await DBDataSource.destroy();
      console.log('Database connection closed.');
    }
  }
}

init();
