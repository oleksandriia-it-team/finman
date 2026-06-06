import { validateServerEnv } from '@backend/config/server-validator';

type EnvConfig = ReturnType<typeof validateServerEnv>;

let cached: EnvConfig | null = null;
const getEnv = (): EnvConfig => (cached ??= validateServerEnv());

export const EnvConfigConstant = new Proxy({} as EnvConfig, {
  get: (_, key: string) => getEnv()[key as keyof EnvConfig],
});
