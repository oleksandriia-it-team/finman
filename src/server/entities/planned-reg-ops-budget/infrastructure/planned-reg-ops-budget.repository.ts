import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { PlannedRegOpsBudgetOrm } from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.orm';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class PlannedRegOpsBudgetRepository extends CrudApiRepository<
  PlannedRegOpsBudgetOrm,
  never,
  Omit<PlannedRegOpsBudgetOrm, DefaultColumnKeys>
> {
  constructor() {
    super(PlannedRegOpsBudgetOrm, 'PlannedRegOpsBudgetOrm');
  }
}

export const plannedRegOpsBudgetRepository = new PlannedRegOpsBudgetRepository();
