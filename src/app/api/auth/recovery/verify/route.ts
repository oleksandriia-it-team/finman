import { createRoute } from '@backend/shared/utils/create-route.util';
import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { VerifyCodeSchema } from '@common/domains/auth/models/recovery.dto';

export const POST = createRoute({
  schema: VerifyCodeSchema,
  guards: [
    async ({ body }) => {
      const result = await recoveryCodeRepository.validateAndGetCode(body.email, body.code);
      if (result.status !== 'valid') {
        let message = 'Код недійсний або прострочений';

        if (result.status === 'attempts_exceeded') {
          message = 'Перевищено ліміт спроб. Запитуйте новий код.';
        }

        if (result.status === 'invalid_code') {
          message = `Невірний код. Залишилося спроб: ${result.remainingAttempts}`;
        }

        return {
          status: 400 as const,
          message,
        };
      }

      return null;
    },
  ],
  execute: async () => {
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
