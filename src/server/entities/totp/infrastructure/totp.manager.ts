import { generateSecret, otpauthURL, totp } from 'speakeasy';
import { AppError } from '@common/classes/app-error.class';
import type { OnlineUser } from '@common/records/user.record';

export const totpApiManager = {
  generateSecretCode: (user: Omit<OnlineUser, 'totpEnabled'>): string => {
    return generateSecret({ name: `Finman ${user.id} ${user.name} ${user.email}` }).base32;
  },
  assertValidAuthCode: (secret: string, code: string | number): void => {
    const isValid = totp.verify({
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
    return otpauthURL({
      secret,
      label,
      issuer: 'Finman',
      encoding: 'base32',
    });
  },
};
