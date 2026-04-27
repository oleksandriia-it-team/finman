import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import type { VerifyCodeDto } from '@common/domains/auth/models/recovery.dto';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export async function ValidCodeGuard(body: VerifyCodeDto): Promise<ApiResultOperationError | null> {
  const result = await recoveryCodeRepository.validateAndGetCode(body.email, body.code);

  switch (result.status) {
    case 'not_found':
      return {
        status: 400 as const,
        message: 'Код не знайдено або термін його дії минув',
      };

    case 'attempts_exceeded':
      return {
        status: 400 as const,
        message: 'Перевищено ліміт спроб. Запитуйте новий код.',
      };

    case 'invalid_code':
      return {
        status: 400 as const,
        message: `Невірний код. Залишилося спроб: ${result.remainingAttempts}`,
      };

    case 'valid':
      return null;
  }
}
