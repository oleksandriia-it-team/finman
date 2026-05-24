import type { TwoFactorSetupContext } from './2fa-setup-context.model';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { totpRepository } from '@backend/entities/totp/infrastructure/totp.repository';

export async function getTwoFactorSetupContext(request: Request): Promise<TwoFactorSetupContext> {
  const userId = await GetUserIdTransformer(request);

  const totp = userId ? await totpRepository.findByUserId(userId) : null;

  return {
    userId,
    totp,
  };
}
