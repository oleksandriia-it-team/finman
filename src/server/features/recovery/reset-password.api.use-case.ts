import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ResetPasswordDto } from '@common/domains/auth/schema/reset-password.schema';
import { userApiRepository, type UserApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import {
  recoveryCodeRepository,
  type RecoveryCodeRepository,
} from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import { totpRepository, type TotpRepository } from '@backend/entities/totp/infrastructure/totp.repository';
import { AppError } from '@common/classes/app-error.class';
import { typeormTransactionManager } from '@backend/database/transaction.manager';

export class ResetPasswordApiUseCase extends TransactionalUseCase<ResetPasswordDto & { userId: number }, void> {
  constructor(
    private readonly userApiRepository: UserApiRepository,
    private readonly recoveryCodeRepository: RecoveryCodeRepository,
    private readonly totpRepository: TotpRepository,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected async handle({ userId, ...dto }: ResetPasswordDto & { userId: number }): Promise<void> {
    const isSuccess = await this.userApiRepository.resetPassword(dto.email, dto.password);

    if (!isSuccess) {
      throw new AppError('Не вдалося оновити пароль', 400);
    }
    await this.recoveryCodeRepository.deleteUserCodes(dto.email);

    const totp = await this.totpRepository.findByUserId(userId);

    if (totp?.enabled) {
      await this.totpRepository.deleteItem(totp.id);
    }
  }
}

export const resetPasswordApiUseCase = new ResetPasswordApiUseCase(
  userApiRepository,
  recoveryCodeRepository,
  totpRepository,
  typeormTransactionManager,
);
