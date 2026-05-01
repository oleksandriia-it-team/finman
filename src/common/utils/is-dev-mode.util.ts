import { PublicEnvConfigConstant } from '@common/config/public-env-config.constant';

export function isDevMode(): boolean {
  return PublicEnvConfigConstant.NEXT_PUBLIC_API_URL === 'http://localhost:3000';
}
