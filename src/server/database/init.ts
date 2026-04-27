import 'dotenv/config';

import { countriesAndLocalesSeeder } from './seeders/countries-and-locales.seeder';
import { currencySeeder } from './seeders/currency.seeder';
import { userSeeder } from '@backend/database/seeders/users.seeder';

async function init() {
  const { DBDataSource } = await import('./database-connection');

  try {
    console.log('--- Starting Database Initialization ---');

    // 1. DISABLE AUTO-SYNCHRONIZATION BEFORE STARTING.
    // This prevents TypeORM from attempting to alter tables during initialize(),
    // which causes conflicts if old data or relationships exist.
    // eslint-disable-next-line
    (DBDataSource.options as any).synchronize = false;

    if (!DBDataSource.isInitialized) {
      await DBDataSource.initialize();
      console.log('✓ Database connection established');
    }

    // 2. HARD RESET: Wipe everything cleanly via PostgreSQL directly.
    // This drops all tables, relations, and ENUM types, giving us a completely blank slate.
    console.log('Clearing old data and tables...');
    await DBDataSource.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    console.log('✓ Database schema fully cleared');

    // 3. BUILD SCHEMA FROM SCRATCH
    // Now that the database is perfectly clean, we tell TypeORM to build the tables
    // based on our current Entity definitions. No conflicts, proper order.
    console.log('Creating new table structure...');
    await DBDataSource.synchronize();
    console.log('✓ Tables created successfully');

    // 4. RUN SEEDERS
    // Order matters: populate dictionaries (countries, currencies) before creating the user.
    console.log('Seeding initial data...');
    await countriesAndLocalesSeeder();
    await currencySeeder();
    await userSeeder();

    console.log('--- INITIALIZATION COMPLETED SUCCESSFULLY! ---');
  } catch (error) {
    console.error('CRITICAL ERROR DURING INIT:', error);
  } finally {
    if (DBDataSource.isInitialized) {
      await DBDataSource.destroy();
      console.log('Database connection closed.');
    }
  }
}

init();
