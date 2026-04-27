export type CreateRecoveryCodeDto = {
  email: string;
  code: string;
  expiresAt: Date;
};
