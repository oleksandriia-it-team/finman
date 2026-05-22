import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { TotpEnabledGuard } from '@backend/features/totp/totp-enabled.guard';
import { getTwoFactorSetupContext } from '../2fa-setup-context.util';
import { AppError } from '@common/classes/app-error.class';
import { totp } from 'speakeasy';
import { totpConfirmSchema } from '@common/domains/totp/totp-confirm.schema';
import type { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';
import { totpRepository } from '@backend/entities/totp/infrastructure/totp.repository';

export const POST = createRoute({
  schema: totpConfirmSchema,
  contextFn: getTwoFactorSetupContext,
  guards: [AuthGuard, ({ context: { totp } }) => TotpEnabledGuard(totp)],
  execute: async ({ context, body }) => {
    const totpEntity = context.totp as TotpOrm;

    const isValid = totp.verify({
      secret: totpEntity.secret,
      encoding: 'base32',
      token: body.code,
      window: 1,
    });

    if (!isValid) {
      throw new AppError('Невірний код', 400);
    }

    const result = await totpRepository.updateItem(totpEntity.id, { ...totpEntity, enabled: true });

    return {
      status: 200,
      data: result,
    };
  },
});
