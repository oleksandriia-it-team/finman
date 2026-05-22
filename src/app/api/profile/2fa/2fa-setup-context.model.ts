import type { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';

export interface TwoFactorSetupContext {
  userId: number | null;
  totp: TotpOrm | null;
}
