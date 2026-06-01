import type { TableLocalModel } from '@frontend/shared/models/table.local.model';

export const DatabaseName = 'FINMAN';

export const Tables: Record<string, TableLocalModel> = {
  BudgetPlanTable: {
    name: 'budgetPlans',
  },
  RegularExpensesAndIncomesTable: {
    name: 'regularExpensesAndIncomes',
  },
  UnregularEntries: {
    name: 'unregularEntries',
  },
  DelayedExpensesTable: {
    name: 'delayedExpenses',
  },
  TrackingOperationsTable: {
    name: 'trackingOperations',
    indexedColumns: ['date'],
  },
  PlannedRegOpsBudgetTable: {
    name: 'plannedRegOpsBudget',
    indexedColumns: ['budgetPlanId', 'regularOperationId'],
  },
};
