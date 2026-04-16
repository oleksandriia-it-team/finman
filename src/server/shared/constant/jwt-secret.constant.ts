import { EnvConfigConstant } from '@backend/config/env-config.constant';

export const JwtSecretConstant = new TextEncoder().encode(EnvConfigConstant.JWT_SECRET);
