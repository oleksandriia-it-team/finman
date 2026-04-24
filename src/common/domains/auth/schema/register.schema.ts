import { CreateUserSchema } from '@common/domains/user/schema/user.schema';
import type { z } from 'zod';

export const RegisterSchema = CreateUserSchema.omit({ role: true });

export type RegisterDto = z.infer<typeof RegisterSchema>;
