import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getTwoFactorSetupContext } from '../2fa-setup-context.util';
import { totpConfirmSchema } from '@common/domains/totp/totp-confirm.schema';
import type { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';
import { totpRepository } from '@backend/entities/totp/infrastructure/totp.repository';
import { totpApiManager } from '@backend/entities/totp/infrastructure/totp.manager';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { TotpNotEnabledGuard } from '@backend/features/totp/totp-not-enabled.guard';

export const POST = createRoute({
  schema: totpConfirmSchema,
  contextFn: getTwoFactorSetupContext,
  guards: [AuthGuard, ({ context: { totp } }) => TotpNotEnabledGuard(totp)],
  execute: async ({ context, body }) => {
    const totpEntity = context.totp as TotpOrm;

    totpApiManager.assertValidAuthCode(totpEntity.secret, body.code);

    const result = await totpRepository.updateItem(totpEntity.id, { ...totpEntity, enabled: true });

    return {
      status: 200,
      data: result,
    };
  },
  filter: getDefaultApiErrorFilter,
});
