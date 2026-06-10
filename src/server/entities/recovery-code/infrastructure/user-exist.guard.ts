import type { ForgotPasswordDto } from '@common/domains/auth/schema/forgot-password.schema';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { ErrorTexts } from '@common/constants/error-texts.constant';

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
      message: ErrorTexts.UserNotFoundByEmail,
    };
  }
  return null;
}
