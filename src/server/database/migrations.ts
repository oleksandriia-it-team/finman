import { AddBudgetPlanAndMonthEntry1777240075396 } from './migrations/1777240075396-add-budget-plan-and-month-entry.migration';
import { AddAdminIdToLookups1746000000000 } from '@backend/database/migrations/1746000000000-add-admin-id-to-lookups.migration';
import { AddPriorityInMonthEntry1777497626400 } from '@backend/database/migrations/1777497626400-add-priority-in-month-entry.migration';
import { AddUniqueColumnsInBudgetPlan1777654086405 } from '@backend/database/migrations/1777654086405-add-unique-columns-in-budget-plan.migration';
import { AddUniqueColumnsInRegularEntry1777723411134 } from '@backend/database/migrations/1777723411134-add-unique-columns-in-regular-entry.migration';
import { AddRecoveryCodesTable1777285743179 } from '@backend/database/migrations/1777285743179-add-recovery-codes.migration';
import { AddTrackingOperation1745000000000 } from '@backend/database/migrations/1745000000000-add-tracking-operation.migration';
import { UpdateRecoveryCodesAddAttempts1777290000000 } from '@backend/database/migrations/1777304687072-update-recovery-codes-add-attemps';

export const Migrations = [
  AddTrackingOperation1745000000000,
  AddRecoveryCodesTable1777285743179,
  UpdateRecoveryCodesAddAttempts1777290000000,
  AddBudgetPlanAndMonthEntry1777240075396,
  AddAdminIdToLookups1746000000000,
  AddPriorityInMonthEntry1777497626400,
  AddUniqueColumnsInBudgetPlan1777654086405,
  AddUniqueColumnsInRegularEntry1777723411134,
];
