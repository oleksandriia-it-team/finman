import { getZodErrorMessage } from '@common/utils/get-zod-error-message.util';
import { clientSchema } from '@common/config/client';
import { ErrorTexts } from '@common/constants/error-texts.constant';

export const validateClientEnv = () => {
  const client = clientSchema.safeParse(process.env);

  if (!client.success) {
    throw new Error(ErrorTexts.ClientEnvInvalidPrefix + getZodErrorMessage(client).message);
  }
  return client.data;
};
