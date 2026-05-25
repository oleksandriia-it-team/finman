import { z } from 'zod';
import { SixCodeSchema } from '@common/schema-fields/six-code.schema';

export const totpConfirmSchema = z.object({
  code: SixCodeSchema,
});

export type TotpConfirmDto = z.infer<typeof totpConfirmSchema>;
