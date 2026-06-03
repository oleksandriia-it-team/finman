import { z } from 'zod';
import { Month } from '@common/enums/month.enum';
import { AllCategoryValues } from '@common/enums/categories.enum';

const monthLiterals = Object.values(Month).map((v) => z.literal(v)) as [z.ZodLiteral<Month>, ...z.ZodLiteral<Month>[]];

export const MonthYearSchema = z.object({
  year: z.int({ error: 'Year must be a number' }).min(2000, { error: 'Year must be 2000 or later' }),
  month: z.union(monthLiterals, 'Invalid month'),
});

export const MonthRangeSchema = z
  .object({
    dateFrom: MonthYearSchema,
    dateTo: MonthYearSchema,
  })
  .superRefine((data, ctx) => {
    const fromKey = data.dateFrom.year * 12 + data.dateFrom.month;
    const toKey = data.dateTo.year * 12 + data.dateTo.month;
    if (fromKey > toKey) {
      ctx.addIssue({ code: 'custom', path: ['dateTo'], message: 'dateTo must not be earlier than dateFrom' });
    }
  });

export const MonthlyIncomeExpensesFilterSchema = z
  .object({
    dateFrom: MonthYearSchema,
    dateTo: MonthYearSchema,
    categories: z.array(z.enum(AllCategoryValues)).optional(),
  })
  .superRefine((data, ctx) => {
    const fromKey = data.dateFrom.year * 12 + data.dateFrom.month;
    const toKey = data.dateTo.year * 12 + data.dateTo.month;
    if (fromKey > toKey) {
      ctx.addIssue({ code: 'custom', path: ['dateTo'], message: 'dateTo must not be earlier than dateFrom' });
    }
  });

export const CategoryBreakdownFilterSchema = MonthRangeSchema;

export const PlanVsActualFilterSchema = MonthYearSchema;

export type MonthYear = z.infer<typeof MonthYearSchema>;
export type MonthRange = z.infer<typeof MonthRangeSchema>;
export type MonthlyIncomeExpensesFilter = z.infer<typeof MonthlyIncomeExpensesFilterSchema>;
export type CategoryBreakdownFilter = z.infer<typeof CategoryBreakdownFilterSchema>;
export type PlanVsActualFilter = z.infer<typeof PlanVsActualFilterSchema>;
