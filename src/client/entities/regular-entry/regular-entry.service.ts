import { regularEntryLocalRepository } from '../../local-repositories/regular-entry/regular-entry.local.repository';
import { BasicDataSource } from '../../database/data-source/basic.data-source';

export const regularEntryService = new BasicDataSource(regularEntryLocalRepository);
