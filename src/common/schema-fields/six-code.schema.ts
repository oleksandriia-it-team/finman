import { z } from 'zod';

export const SixCodeSchema = z
  .string({ error: 'Код є обовʼязковим' })
  .min(6, { error: 'Код має містити 6 символів' })
  .max(6, { error: 'Код має містити 6 символів' })
  .regex(/^\d+$/, 'Код має бути числовим рядком');
