import { z } from 'zod';
import { TypeEntry } from '@common/enums/entry.enum';
import { AllCategoryValues, ExpenseCategories } from '@common/enums/categories.enum';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';
import { getDate } from '@common/utils/get-date.util';

const TrackingOperationTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export const TrackingOperationSchema = z.object({
  id: z.number().int({ message: 'ID має бути цілим числом' }).min(1, { message: 'ID не може бути менше 1' }),
  title: z
    .string()
    .min(1, { message: "Назва обов'язкова" })
    .max(20, { message: 'Назва не може бути довшою за 20 символів' }),
  description: z.string().max(100, { message: 'Опис не може бути довшим за 100 символів' }).nullable().optional(),
  type: z.enum(TrackingOperationTypes, {
    message: 'Тип має бути expense або income',
  }),
  date: z.coerce.date({ message: "Обов'язкова дата" }),
  sum: z.coerce.number({ message: 'Сума має бути числом' }).min(1, { message: 'Сума має бути не менше 1' }),
  category: z.enum(AllCategoryValues).default(ExpenseCategories.Misc),
});

export const TrackingOperationFilterSchema = z
  .object({
    dateFrom: z.transform(getDate).optional(),
    dateTo: z.transform(getDate).optional(),
    category: z.array(z.enum(AllCategoryValues)).optional(),
    type: z.enum(TrackingOperationTypes).optional(),
    search: z.string().optional(),
    softDeleted: z.union([z.literal(0), z.literal(1)]).optional(),
    minSum: z.coerce.number().optional(),
    maxSum: z.coerce.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dateFrom && data.dateTo && data.dateFrom > data.dateTo) {
      ctx.addIssue({ code: 'custom', path: ['dateTo'], message: 'dateTo має бути більшим або рівним dateFrom' });
    }
    if (data.minSum !== undefined && data.maxSum !== undefined && data.minSum > data.maxSum) {
      ctx.addIssue({ code: 'custom', path: ['maxSum'], message: 'maxSum має бути більшим або рівним minSum' });
    }
  });

const basePaginatedSchema = createPaginatedSchema(TrackingOperationFilterSchema);
export type TrackingOperationFilterFormData = z.infer<typeof TrackingOperationFilterSchema>;

export const TrackingOperationPaginationSchema = {
  ...basePaginatedSchema,
  itemsSchema: basePaginatedSchema.itemsSchema.superRefine((data, ctx) => {
    if (data.to < data.from) {
      ctx.addIssue({ code: 'custom', path: ['to'], message: 'to має бути більшим або рівним from' });
    }
  }),
};

export const TrackingOperationFormSchema = TrackingOperationSchema.omit({ id: true });

export type TrackingOperationFormData = z.infer<typeof TrackingOperationFormSchema>;
