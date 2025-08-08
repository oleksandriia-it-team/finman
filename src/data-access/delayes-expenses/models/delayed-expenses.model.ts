import { CrudService } from '../../../shared/classes/crud-service.class';
import { DelayedExpense } from '../../budget-plan/models/entry.model';

export type IDelayedExpensesService = CrudService<DelayedExpense>;