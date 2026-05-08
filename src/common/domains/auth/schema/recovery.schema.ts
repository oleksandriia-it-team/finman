import { z } from 'zod';

export const VerifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export type VerifyCodeDto = z.infer<typeof VerifyCodeSchema>;
