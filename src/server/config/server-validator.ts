import { serverSchema } from '@backend/config/server';
import { getZodErrorMessage } from '@common/utils/get-zod-error-message.util';
import { clientSchema } from '@common/config/client';

export const validateServerEnv = () => {
  const client = clientSchema.safeParse(process.env);
  const server = serverSchema.safeParse(process.env);

  if (!client.success) {
    throw new Error('Client env ' + getZodErrorMessage(client).message);
  }

  if (!server.success) {
    throw new Error('Server env ' + getZodErrorMessage(server).message);
  }

  return {
    ...client.data,
    ...server.data,
  };
};
