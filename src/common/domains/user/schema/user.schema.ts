import { UserRequirements } from '@common/domains/user/constants/user-requirements.constant';
import { z } from 'zod';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export const CreateUserSchema = z.object({
  email: z.string().email().max(UserRequirements.MaxEmailLength),
  name: z.string().min(4).max(UserRequirements.MaxNameLength),
  password: z.string().min(8).max(UserRequirements.MaxPasswordLength),
  role: z.nativeEnum(RoleEnum).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
