import { RegularEntry } from '../../budget-plan/models/entry.model';
import { ICrudService } from '../../../shared/models/crud-service.model';
import { DatabaseResultOperationSuccess } from '../../../shared/models/database-result-operation.model';

export interface IRegularExpensesAndIncomesService extends ICrudService<RegularEntry> {
  getItemsWithSoftDeleted(first: number, last: number): Promise<DatabaseResultOperationSuccess<RegularEntry[]>>;
}