import { z } from 'zod';

export const ConfirmCodeSchema = z.object({
  code: z.string().length(6, 'Введіть усі 6 цифр'),
});

export type ConfirmCodeDto = z.infer<typeof ConfirmCodeSchema>;
