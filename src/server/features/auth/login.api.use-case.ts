import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { LoginDto } from '@common/domains/auth/schema/login.schema';
import { type UserApiRepository, userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import bcrypt from 'bcrypt';
import { createAccessToken } from '@backend/shared/utils/jwt.util';
import { AppError } from '@common/classes/app-error.class';
import { typeormTransactionManager } from '@backend/database/transaction.manager';
import { isEmpty } from '@common/utils/is-empty.util';
import { type TotpApiManager, totpApiManager } from '@backend/entities/totp/infrastructure/totp.manager';

export class LoginApiUseCase extends TransactionalUseCase<LoginDto, string> {
  constructor(
    private readonly userApiRepository: UserApiRepository,
    private readonly totpApiManager: TotpApiManager,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected async handle(dto: LoginDto): Promise<string> {
    const user = await this.userApiRepository.findUserForLogin(dto.login);

    if (!user) {
      throw new AppError('Недійсні облікові дані', 401);
    }

    const isMatch = await bcrypt.compare(dto.password, user.password as string);

    if (!isMatch) {
      throw new AppError('Недійсні облікові дані', 401);
    }

    if (user.totp?.enabled && isEmpty(dto.code)) {
      throw new AppError("Двофакторна аутентифікація увімкнена, код обов'язковий", 401);
    }

    if (user.totp?.enabled && !isEmpty(dto.code)) {
      this.totpApiManager.assertValidAuthCode(user.totp.secret, dto.code);
    }

    return await createAccessToken({
      userId: user.id,
      role: user.role,
    });
  }
}

export const loginApiUseCase = new LoginApiUseCase(userApiRepository, totpApiManager, typeormTransactionManager);
