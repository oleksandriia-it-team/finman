import { EnvConfigConstant } from '@backend/config/env-config.constant';

let cached: Uint8Array | null = null;

export const getJwtSecret = (): Uint8Array => (cached ??= new TextEncoder().encode(EnvConfigConstant.JWT_SECRET));
