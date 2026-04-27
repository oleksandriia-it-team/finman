import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { RecoveryService } from '@common/domains/auth/modules/recovery.service';
import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import { type ForgotPasswordDto, ForgotPasswordSchema } from '@common/domains/auth/schema/forgot-password.schema';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { UserExistsRecoveryGuard } from '@backend/entities/recovery-code/infrastructure/user-exist.guard';

export const POST = createRoute({
  schema: ForgotPasswordSchema,

  contextFn: async () => ({}),

  guards: [({ body }) => UserExistsRecoveryGuard({ body: body as ForgotPasswordDto })],

  execute: async ({ body }: { body: ForgotPasswordDto }) => {
    const email = body.email as string;
    await recoveryCodeRepository.deleteUserCodes(email);
    const code = RecoveryService.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    await recoveryCodeRepository.repository.save({
      email,
      code,
      expiresAt,
    });
    const { error } = await RecoveryService.sendEmail(email, code);

    if (error) {
      return {
        status: 400,
        message: 'Не вдалося відправити лист. Спробуйте пізніше.',
      };
    }

    return { status: 200, data: true };
  },

  filter: getDefaultApiErrorFilter,
});
