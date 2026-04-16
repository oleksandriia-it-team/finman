import { getZodErrorMessage } from '@common/utils/get-zod-error-message.util';
import { clientSchema } from '@common/config/client';

export const validateClientEnv = () => {
  const client = clientSchema.safeParse(process.env);

  if (!client.success) {
    throw new Error('Client env ' + getZodErrorMessage(client).message);
  }
  return client.data;
};
