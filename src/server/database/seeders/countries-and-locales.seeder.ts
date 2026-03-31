import path from 'node:path';
import fs from 'node:fs';
import { countryRepository } from '../../entities/country/infrastructure/country.repository';

export async function countriesAndLocalesSeeder() {
  const jsonPath = path.join(process.cwd(), 'public/json/countries.json');
  const countries = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`Seeding ${countries.length} countries...`);

  for (const data of countries) {
    await countryRepository.createItem(data);
  }
}
