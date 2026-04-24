import { z } from 'zod';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories, type AllCategories } from '@common/enums/categories.enum';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const TrackingOperationTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

const allCategoryValues = Array.from(
  new Set([...Object.values(ExpenseCategories), ...Object.values(IncomeCategories)]),
) as [AllCategories, ...AllCategories[]];

export const TrackingOperationSchema = z.object({
  id: z.number().int({ message: 'ID має бути цілим числом' }).min(1, { message: 'ID не може бути менше 1' }),
  title: z
    .string()
    .min(1, { message: "Назва обов'язкова" })
    .max(20, { message: 'Назва не може бути довшою за 20 символів' }),
  description: z.string().max(100, { message: 'Опис не може бути довшим за 100 символів' }).optional(),
  type: z.enum(TrackingOperationTypes, {
    message: 'Тип має бути expense або income',
  }),
  date: z.coerce.date({ message: "Обов'язкова дата" }),
  sum: z.number().min(1, { message: 'Сума має бути не менше 1' }),
  category: z.enum(allCategoryValues).default(ExpenseCategories.Misc),
});

export type TrackingOperationDto = z.infer<typeof TrackingOperationSchema>;

const filterSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  category: z.enum(allCategoryValues).optional(),
  sum: z.number().optional(),
  type: z.enum(TrackingOperationTypes).optional(),
  search: z.string().optional(),
  softDeleted: z.union([z.literal(0), z.literal(1)]).optional(),
  minSum: z.number().optional(),
  maxSum: z.number().optional(),
});

export const TrackingOperationPaginationSchema = createPaginatedSchema(filterSchema);
