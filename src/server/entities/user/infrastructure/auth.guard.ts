import { RouteGuardParams } from '@backend/shared/models/create-route.model';
import { isEmpty } from '@common/utils/is-empty.util';
import { ApiResultOperationError } from '@common/models/api-result-operation.model';

export async function AuthGuard<BTR extends number | null | { userId: number | null }>(
  data: RouteGuardParams<BTR, unknown, unknown>,
): Promise<ApiResultOperationError | null> {
  const token =
    typeof data.beforeGuardTransformers === 'number'
      ? data.beforeGuardTransformers
      : data.beforeGuardTransformers?.userId;

  if (isEmpty(token)) {
    return {
      status: 401,
      message: 'Ви не авторизовані',
    };
  }

  return null;
}
