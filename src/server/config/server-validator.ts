import { serverSchema } from '@backend/config/server';
import { getZodErrorMessage } from '@common/utils/get-zod-error-message.util';

export const validateServerEnv = () => {
  const server = serverSchema.safeParse(process.env);

  if (!server.success) {
    throw new Error('Server env ' + getZodErrorMessage(server).message);
  }

  return server.data;
};
