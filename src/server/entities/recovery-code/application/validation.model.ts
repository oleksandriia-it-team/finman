import { type RecoveryCodeOrm } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';
import type { RecoveryValidationStatus } from '@common/enums/recovery-status.enum';

export type ValidationResult =
  | { status: typeof RecoveryValidationStatus.NotFound }
  | { status: typeof RecoveryValidationStatus.AttemptsExceeded }
  | { status: typeof RecoveryValidationStatus.InvalidCode; remainingAttempts: number }
  | { status: typeof RecoveryValidationStatus.Valid; record: RecoveryCodeOrm };
