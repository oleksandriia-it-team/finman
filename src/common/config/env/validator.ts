import { serverSchema } from '@common/config/env/server';
import { clientSchema } from '@common/config/env/client';
import { z } from 'zod';

export const validateEnv = () => {
  const client = clientSchema.safeParse(process.env);
  const server = serverSchema.safeParse(process.env);

  if (!client.success) {
    console.error('Client Environment Error:', z.treeifyError(client.error));
    throw new Error('Invalid Client ENV');
  }

  if (!server.success) {
    console.error('Server Environment Error:', z.treeifyError(server.error));
    throw new Error('Invalid Server ENV');
  }

  return {
    ...client.data,
    ...server.data,
  };
};
