import { AddRecoveryCodesTable1777285743179 } from '@backend/database/migrations/1777285743179-add-recovery-codes.migration';
import { AddTrackingOperation1745000000000 } from '@backend/database/migrations/1745000000000-add-tracking-operation.migration';
import { UpdateRecoveryCodesAddAttempts1777290000000 } from '@backend/database/migrations/1777304687072-update-recovery-codes-add-attemps';

export const Migrations = [
  AddTrackingOperation1745000000000,
  AddRecoveryCodesTable1777285743179,
  UpdateRecoveryCodesAddAttempts1777290000000,
];
