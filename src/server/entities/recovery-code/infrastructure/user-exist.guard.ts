import type { ForgotPasswordDto } from '@common/domains/auth/schema/forgot-password.schema';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export async function UserExistsRecoveryGuard({ body }: { body: ForgotPasswordDto }) {
  const user = await userApiRepository.repository.findOneBy({
    email: body.email as string,
  });
  if (!user) {
    return { status: 200, data: true } as unknown as ApiResultOperationError;
  }
  return null;
}
