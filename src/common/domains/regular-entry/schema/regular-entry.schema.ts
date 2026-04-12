import { z } from 'zod';
import { RegularEntryRequirements } from '@common/domains/regular-entry/constants/regular-entry-requirements.constant';
import { TypeEntry } from '@common/enums/entry.enum';

const RegularEntryTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export const RegularEntrySchema = z.object({
  id: z.int().min(1),
  title: z.string().min(1).max(RegularEntryRequirements.MaxTitleLength),
  description: z.string().min(1).max(RegularEntryRequirements.MaxDescriptionLength),
  sum: z.number().min(RegularEntryRequirements.MinSumValue),
  type: z.enum(RegularEntryTypes),
});
