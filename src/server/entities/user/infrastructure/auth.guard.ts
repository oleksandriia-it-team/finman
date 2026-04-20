import { type RouteGuardParams } from '@backend/shared/models/create-route.model';
import { isEmpty } from '@common/utils/is-empty.util';
import { type ApiResultOperationError } from '@common/models/api-result-operation.model';

export async function AuthGuard<BTR extends number | null | { userId: number | null }>(
  data: RouteGuardParams<BTR, unknown, unknown>,
): Promise<ApiResultOperationError | null> {
  const token = typeof data.context === 'number' ? data.context : data.context?.userId;

  if (isEmpty(token)) {
    return {
      status: 401,
      message: 'Ви не авторизовані',
    };
  }

  return null;
}
