import { WorkMode } from '@common/enums/work-mode.enum';
import type { DropdownOption } from '@frontend/shared/models/dropdown-option.model';

export const WORK_MODE_OPTIONS: DropdownOption<WorkMode>[] = [
  { value: WorkMode.Online, label: 'Онлайн' },
  { value: WorkMode.Offline, label: 'Офлайн' },
];
