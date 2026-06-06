import { CreateTotpOrm1779620534129 } from '@backend/database/migrations/1779620534129-CreateTotpOrm';
import { CreatePlannedRegOpsBudgetOrm1779749954455 } from '@backend/database/migrations/1779749954455-CreatePlannedRegOpsBudgetOrm';
import { AddPlannedRegOpsBudgetAndTrackingAttachments1779821472804 } from '@backend/database/migrations/1779821472804-AddPlannedRegOpsBudgetAndTrackingAttachments';
import { AddUserCascadeToBudgetPlanAndRegularEntry1780787231228 } from '@backend/database/migrations/1780787231228-AddUserCascadeToBudgetPlanAndRegularEntry';

export const Migrations = [
  CreateTotpOrm1779620534129,
  CreatePlannedRegOpsBudgetOrm1779749954455,
  AddPlannedRegOpsBudgetAndTrackingAttachments1779821472804,
  AddUserCascadeToBudgetPlanAndRegularEntry1780787231228,
];
