import { SignJWT } from 'jose';
import { JwtSecretConstant } from '@backend/shared/constant/jwt-secret.constant';

export async function createAccessToken(payload: { userId: number; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JwtSecretConstant);
}
