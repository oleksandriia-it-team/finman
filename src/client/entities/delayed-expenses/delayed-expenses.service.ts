import { delayedExpensesLocalRepository } from '../../local-repositories/delayes-expenses/delayed-expenses.local.repository';
import { BasicDataSource } from '../../database/data-source/basic.data-source';

export const delayedExpensesService = new BasicDataSource(delayedExpensesLocalRepository);
