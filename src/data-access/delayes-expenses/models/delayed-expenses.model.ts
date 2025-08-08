import { DelayedExpense } from '../../budget-plan/models/entry.model';
import { ICrudService } from '../../../shared/models/crud-service.model';

export type IDelayedExpensesService = ICrudService<DelayedExpense>;