import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import type { VerifyCodeDto } from '@common/domains/auth/schema/recovery.schema';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { RecoveryValidationStatus } from '@common/enums/recovery-status.enum';

export async function ValidCodeGuard(body: VerifyCodeDto): Promise<ApiResultOperationError | null> {
  const result = await recoveryCodeRepository.validateAndGetCode(body.email, body.code);

  switch (result.status) {
    case RecoveryValidationStatus.NotFound:
      return {
        status: 400 as const,
        message: 'Код не знайдено або термін його дії минув',
      };

    case RecoveryValidationStatus.AttemptsExceeded:
      return {
        status: 400 as const,
        message: 'Перевищено ліміт спроб. Запитуйте новий код.',
      };

    case RecoveryValidationStatus.InvalidCode:
      return {
        status: 400 as const,
        message: `Невірний код. Залишилося спроб: ${result.remainingAttempts}`,
      };

    case RecoveryValidationStatus.Valid:
      return null;
    default: {
      return null;
    }
  }
}
