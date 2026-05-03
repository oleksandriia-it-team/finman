import { isEmpty } from '@common/utils/is-empty.util';
import { jwtVerify } from 'jose';
import { JwtSecretConstant } from '@backend/config/jwt-secret.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export async function GetUserRoleTransformer(request: Request): Promise<RoleEnum | null> {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (isEmpty(token)) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JwtSecretConstant);
    return Object.values(RoleEnum).includes(payload.role as RoleEnum) ? (payload.role as RoleEnum) : null;
  } catch {
    return null;
  }
}
