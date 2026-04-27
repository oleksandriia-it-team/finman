import type { RecoveryCode } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';

export type ValidationResult =
  | { status: 'valid'; record: RecoveryCode }
  | { status: 'invalid_code'; remainingAttempts: number }
  | { status: 'attempts_exceeded' }
  | { status: 'not_found' };
