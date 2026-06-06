import { isEmpty } from '@common/utils/is-empty.util';
import { jwtVerify } from 'jose';
import { getJwtSecret } from '@backend/config/jwt-secret.constant';

export async function GetUserIdTransformer(request: Request): Promise<number | null> {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (isEmpty(token)) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return (payload.userId as number) ?? null;
  } catch {
    return null;
  }
}
