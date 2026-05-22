import { z } from 'zod';

export const totpConfirmSchema = z.object({
  code: z
    .string({ error: 'Код є обовʼязковим' })
    .min(6, { error: 'Код має містити 6 символів' })
    .max(6, { error: 'Код має містити 6 символів' }),
});

export type TotpConfirmInput = z.infer<typeof totpConfirmSchema>;
