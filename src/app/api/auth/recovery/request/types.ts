import type { UserOrm } from '@backend/entities/user/infrastructure/user.orm';

export interface RecoveryContext {
  user: UserOrm | null;
}
