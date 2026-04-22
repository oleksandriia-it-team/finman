import type { RegisterDto } from '@common/domains/auth/schema/register.schema';

export type ApiPayload = Omit<RegisterDto, 'passwordConfirm'>;
