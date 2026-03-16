import fs from 'node:fs';
import path from 'node:path';
import DBDataSource from './database-connection';
import { currencyRepository } from '../entities/currency/infrastructure/currency.repository';
import 'reflect-metadata';

async function seed() {
  try {
    if (!DBDataSource.isInitialized) {
      await DBDataSource.initialize();
      console.log('Database connected via DBDataSource');
    }

    const jsonPath = path.join(process.cwd(), 'public/json/currencies.json');
    const currencies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    console.log(`Seeding ${currencies.length} currencies...`);

    for (const data of currencies) {
      await currencyRepository.createItem(data);
    }

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
seed();
