import type { ForgotPasswordDto } from '@common/domains/auth/schema/forgot-password.schema';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';

export async function UserExistsRecoveryGuard({
  body,
}: {
  body: ForgotPasswordDto;
}): Promise<ApiResultOperation<boolean> | null> {
  const email = body.email.trim().toLowerCase();

  const user = await userApiRepository.repository.findOneBy({ email });

  if (!user) {
    return {
      status: 200,
      data: true,
    };
  }

  return null;
}
