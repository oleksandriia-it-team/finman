import { TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ResetPasswordDto } from '@common/domains/auth/schema/reset-password.schema';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import { totpRepository } from '@backend/entities/totp/infrastructure/totp.repository';
import { AppError } from '@common/classes/app-error.class';
import { typeormTransactionManager } from '@backend/database/transaction.manager';

export class ResetPasswordApiUseCase extends TransactionalUseCase<ResetPasswordDto & { userId: number }, void> {
  protected async handle({ userId, ...dto }: ResetPasswordDto & { userId: number }): Promise<void> {
    const isSuccess = await userApiRepository.resetPassword(dto.email, dto.password);

    if (!isSuccess) {
      throw new AppError('Не вдалося оновити пароль', 400);
    }
    await recoveryCodeRepository.deleteUserCodes(dto.email);

    const totp = await totpRepository.findByUserId(userId);

    if (totp && totp.enabled) {
      await totpRepository.deleteItem(totp.id);
    }
  }
}

export const resetPasswordApiUseCase = new ResetPasswordApiUseCase(typeormTransactionManager);
