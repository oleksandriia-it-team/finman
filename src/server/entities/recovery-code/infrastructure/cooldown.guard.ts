import type { ForgotPasswordDto } from '@common/domains/auth/schema/forgot-password.schema';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';

export async function CooldownRecoveryGuard({
  body,
}: {
  body: ForgotPasswordDto;
}): Promise<ApiResultOperationError | null> {
  const email = body.email.trim().toLowerCase();

  const COOLDOWN_SECONDS = 30;

  const latestCode = await recoveryCodeRepository.repository.findOne({
    where: { email },
    order: { createdAt: 'DESC' },
  });

  if (latestCode && latestCode.createdAt) {
    const now = new Date();

    const diffMs = now.getTime() - latestCode.createdAt.getTime();
    const diffSeconds = diffMs / 1000;

    if (diffSeconds < COOLDOWN_SECONDS) {
      return {
        status: 429,
        message: `Занадто багато спроб. Будь ласка, зачекайте ${COOLDOWN_SECONDS} секунд перед наступним запитом.`,
      };
    }
  }

  return null;
}
