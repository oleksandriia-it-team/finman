import type { ForgotPasswordDto } from '@common/domains/auth/schema/forgot-password.schema';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { CooldownTimeSecond } from '@common/constants/cooldown-time.constant';
import { ErrorTexts } from '@common/constants/error-texts.constant';

const cooldownCache = new Map<string, number>();

export async function CooldownRecoveryGuard({
  body,
}: {
  body: ForgotPasswordDto;
}): Promise<ApiResultOperationError | null> {
  const email = body.email.trim().toLowerCase();

  const now = Date.now();

  const lastRequestTime = cooldownCache.get(email);

  if (lastRequestTime) {
    const diffSeconds = (now - lastRequestTime) / 1000;
    if (diffSeconds < CooldownTimeSecond) {
      return {
        status: 429,
        message: ErrorTexts.CooldownWait,
        messageParams: { seconds: CooldownTimeSecond },
      };
    }
  }
  cooldownCache.set(email, now);

  setTimeout(() => {
    cooldownCache.delete(email);
  }, CooldownTimeSecond * 1000);

  return null;
}
