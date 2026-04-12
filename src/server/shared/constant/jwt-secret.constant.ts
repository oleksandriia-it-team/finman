import { EnvConfigConstant } from '@common/constants/env-config.constant';

export const JwtSecretConstant = new TextEncoder().encode(EnvConfigConstant.JWT_SECRET);
