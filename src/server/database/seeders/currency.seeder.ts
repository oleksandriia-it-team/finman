import path from 'node:path';
import fs from 'node:fs';
import { currencyRepository } from '../../entities/currency/infrastructure/currency.repository';

export async function currencySeeder() {
  const jsonPath = path.join(process.cwd(), 'public/json/currencies.json');
  const currencies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`Seeding ${currencies.length} currencies...`);

  for (const data of currencies) {
    await currencyRepository.createItem(data);
  }
}