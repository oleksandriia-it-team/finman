import { createRoute } from '@backend/shared/utils/create-route.util';
import { getTwoFactorSetupContext } from '../2fa-setup-context.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { TotpEnabledGuard } from '@backend/features/totp/totp-enabled.guard';
import type { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';
import { totpRepository } from '@backend/entities/totp/infrastructure/totp.repository';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';

export const POST = createRoute({
  contextFn: getTwoFactorSetupContext,
  guards: [AuthGuard, ({ context: { totp } }) => TotpEnabledGuard(totp)],
  execute: async ({ context }) => {
    const totpEntity = context.totp as TotpOrm;

    return { status: 200, data: await totpRepository.deleteItem(totpEntity.id) };
  },
  filter: getDefaultApiErrorFilter,
});
