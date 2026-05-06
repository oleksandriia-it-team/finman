export const RecoveryValidationStatus = {
  NotFound: 'NotFound',
  AttemptsExceeded: 'AttemptsExceeded',
  InvalidCode: 'InvalidCode',
  Valid: 'Valid',
} as const;

export type RecoveryValidationStatus = (typeof RecoveryValidationStatus)[keyof typeof RecoveryValidationStatus];
