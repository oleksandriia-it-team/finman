import { UserOrm } from '../entities/user/infrastructure/user.orm';
import { CurrencyOrm } from '../entities/currency/infrastructure/currency.orm';
import { CountryOrm } from '../entities/country/infrastructure/country.orm';
import { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import { MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';
import { RecoveryCodeOrm } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';

export const Entities = [
  UserOrm,
  CurrencyOrm,
  CountryOrm,
  RegularEntryOrm,
  TrackingOperationOrm,
  BudgetPlanOrm,
  MonthEntryOrm,
  RecoveryCodeOrm,
];
