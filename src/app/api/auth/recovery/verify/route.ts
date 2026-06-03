import { createRoute } from '@backend/shared/utils/create-route.util';
import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { VerifyCodeSchema } from '@common/domains/auth/schema/recovery.schema';
import { RecoveryValidationStatus } from '@common/enums/recovery-status.enum';
import { ErrorTexts } from '@common/constants/error-texts.constant';

export const POST = createRoute({
  schema: VerifyCodeSchema,
  guards: [
    async ({ body }) => {
      const result = await recoveryCodeRepository.validateAndGetCode(body.email, body.code);
      if (result.status !== RecoveryValidationStatus.Valid) {
        if (result.status === RecoveryValidationStatus.AttemptsExceeded) {
          return { status: 400 as const, message: ErrorTexts.TooManyAttempts };
        }
        if (result.status === RecoveryValidationStatus.InvalidCode) {
          return {
            status: 400 as const,
            message: ErrorTexts.InvalidCodeWithAttempts,
            messageParams: { remainingAttempts: result.remainingAttempts },
          };
        }
        return { status: 400 as const, message: ErrorTexts.InvalidOrExpiredCode };
      }

      return null;
    },
  ],
  execute: async () => {
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
