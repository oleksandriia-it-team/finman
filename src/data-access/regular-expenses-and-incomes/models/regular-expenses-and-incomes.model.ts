import { CrudService } from '../../../shared/classes/crud-service.class';
import { RegularEntry } from '../../budget-plan/models/entry.model';

export type IRegularExpensesAndIncomesService = CrudService<RegularEntry>;