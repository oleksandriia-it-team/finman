import { AddTrackingOperation1745000000000 } from './migrations/1745000000000-add-tracking-operation.migration';
import { AddBudgetPlanAndMonthEntry1777240075396 } from './migrations/1777240075396-add-budget-plan-and-month-entry.migration';
import { AddAdminIdToLookups1746100000000 } from '@backend/database/migrations/1746000000000-add-admin-id-to-lookups.migration';

export const Migrations = [
  AddTrackingOperation1745000000000,
  AddBudgetPlanAndMonthEntry1777240075396,
  AddAdminIdToLookups1746100000000,
];
