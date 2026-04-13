import { z } from 'zod';
import { RegularEntryRequirements } from '@common/domains/regular-entry/constants/regular-entry-requirements.constant';
import { TypeEntry } from '@common/enums/entry.enum';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const RegularEntryTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export const RegularEntrySchema = z.object({
  id: z.number().int({ message: 'ID має бути цілим числом' }).min(1, { message: 'ID не може бути менше 1' }),

  title: z
    .string('Назва має бути строкою')
    .min(1, { message: "Назва обов'язкова" })
    .max(RegularEntryRequirements.MaxTitleLength, {
      message: `Назва не може бути довшою за ${RegularEntryRequirements.MaxTitleLength} символів`,
    }),

  description: z
    .string('Опис має бути строкою')
    .min(1, { message: "Опис обов'язковий" })
    .max(RegularEntryRequirements.MaxDescriptionLength, {
      message: `Опис не може бути довшим за ${RegularEntryRequirements.MaxDescriptionLength} символів`,
    }),

  sum: z.number({ message: 'Сума має бути числом' }).min(RegularEntryRequirements.MinSumValue, {
    message: `Мінімальна сума: ${RegularEntryRequirements.MinSumValue}`,
  }),

  type: z.enum(RegularEntryTypes, { message: 'Оберіть коректний тип операції (дохід або витрата)' }),
});

export const RegularEntryFilterSchema = z.object({
  type: z.enum(RegularEntryTypes, { message: 'Оберіть коректний тип операції (дохід або витрата)' }).optional(),
  softDeleted: z
    .number({ message: 'Поле softDeleted має бути числом' })
    .min(0, { message: 'Поле softDeleted має бути 0 або 1' })
    .max(1, { message: 'Поле softDeleted має бути 0 або 1' })
    .optional(),
});

export const RegularEntryPaginationSchema = createPaginatedSchema(RegularEntryFilterSchema);
