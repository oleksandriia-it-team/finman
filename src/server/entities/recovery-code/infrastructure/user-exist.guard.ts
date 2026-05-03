import type { ForgotPasswordDto } from '@common/domains/auth/schema/forgot-password.schema';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export async function UserExistsRecoveryGuard({
  body,
}: {
  body: ForgotPasswordDto;
}): Promise<ApiResultOperationError | null> {
  const email = body.email.trim().toLowerCase();
  const user = await userApiRepository.repository.findOneBy({ email });

  if (!user) {
    return {
      status: 400,
      message: 'Якщо ця пошта зареєстрована, ми надішлемо на неї код.',
    };
  }
  return null;
}
