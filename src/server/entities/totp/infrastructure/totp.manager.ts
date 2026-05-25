import * as speakeasy from 'speakeasy';
import { AppError } from '@common/classes/app-error.class';
import type { OnlineUser } from '@common/records/user.record';

export type TotpApiManager = typeof totpApiManager;

export const totpApiManager = {
  generateSecretCode: (user: Omit<OnlineUser, 'totpEnabled'>): string => {
    return speakeasy.generateSecret({ name: `Finman ${user.id} ${user.name} ${user.email}`, length: 20 }).base32;
  },
  assertValidAuthCode: (secret: string, code: string | number): void => {
    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: String(code),
      window: 1,
    });

    if (!isValid) {
      throw new AppError('Невірний код', 400);
    }
  },
  createSetupUrl: (secret: string, label: string): string => {
    return speakeasy.otpauthURL({
      secret,
      label,
      issuer: 'Finman',
      encoding: 'base32',
    });
  },
};
