import { serverSchema } from '@backend/config/server';
import { getZodErrorMessage } from '@common/utils/get-zod-error-message.util';
import { clientSchema } from '@common/config/client';
import { ErrorTexts } from '@common/constants/error-texts.constant';

export const validateServerEnv = () => {
  const client = clientSchema.safeParse(process.env);
  const server = serverSchema.safeParse(process.env);

  if (!client.success) {
    throw new Error(ErrorTexts.ClientEnvInvalidPrefix + getZodErrorMessage(client).message);
  }

  if (!server.success) {
    throw new Error(ErrorTexts.ServerEnvInvalidPrefix + getZodErrorMessage(server).message);
  }

  return {
    ...client.data,
    ...server.data,
  };
};
