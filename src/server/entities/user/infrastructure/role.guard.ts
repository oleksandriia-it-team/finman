import { type RoleEnum } from '@common/domains/user/enums/role.enum';
import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { type RouteGuardParams } from '@backend/shared/models/create-route.model';

type RoleGuardContext = {
  role: RoleEnum | null;
};

export function RoleGuard<BTR extends RoleGuardContext>(
  ...allowedRoles: RoleEnum[]
): (data: RouteGuardParams<BTR, unknown, unknown>) => ApiResultOperationError | null {
  return ({ context }) => {
    if (context.role && allowedRoles.includes(context.role)) {
      return null;
    }

    return {
      status: 403,
      message: 'Недостатньо прав',
    };
  };
}
