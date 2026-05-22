import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { totpRepository } from '@backend/entities/totp/infrastructure/totp.repository';
import { generateSecret, otpauthURL } from 'speakeasy';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { AppError } from '@common/classes/app-error.class';
import { toDataURL } from 'qrcode';
import type { TwoFASetupResponse } from '@common/domains/totp/totp-setup-response.model';
import { getTwoFactorSetupContext } from '../2fa-setup-context.util';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { TotpNotEnabledGuard } from '@backend/features/totp/totp-not-enabled.guard';

export const POST = createRoute({
  contextFn: getTwoFactorSetupContext,
  guards: [AuthGuard, ({ context: { totp } }) => TotpNotEnabledGuard(totp)],
  execute: async ({ context }) => {
    const userId = context.userId as number;
    const totp = context.totp;

    const user = await userApiRepository.getItemById(userId);

    if (!user) {
      throw new AppError('Користувача не знайдено', 404);
    }

    const getResponse = async (secret: string): Promise<ApiResultOperationSuccess<TwoFASetupResponse>> => {
      const uri = otpauthURL({
        secret,
        label: user.email,
        issuer: 'Finman',
        encoding: 'base32',
      });

      const qrCodeImage = await toDataURL(uri);

      return {
        status: 200,
        data: {
          qrCodeImage,
          secret,
        } satisfies TwoFASetupResponse,
      };
    };

    if (totp) {
      return await getResponse(totp.secret);
    }

    const secret = generateSecret({ name: `Finman ${userId} ${user.name} ${user.email}` }).base32;

    await totpRepository.createItem({ enabled: false, secret, userId });

    return await getResponse(secret);
  },
});
