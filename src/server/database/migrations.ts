import { AddTrackingOperation1745000000000 } from './migrations/1745000000000-add-tracking-operation.migration';
import { AddBudgetPlanAndMonthEntry1777240075396 } from './migrations/1777240075396-add-budget-plan-and-month-entry.migration';
import { AddPriorityInMonthEntry1777497626400 } from '@backend/database/migrations/1777497626400-add-priority-in-month-entry.migration';

export const Migrations = [
  AddTrackingOperation1745000000000,
  AddBudgetPlanAndMonthEntry1777240075396,
  AddPriorityInMonthEntry1777497626400,
];
