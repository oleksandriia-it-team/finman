import { z } from 'zod';
import { Month } from '@common/enums/month.enum';
import { AllCategoryValues } from '@common/enums/categories.enum';

const monthLiterals = Object.values(Month).map((v) => z.literal(v)) as [z.ZodLiteral<Month>, ...z.ZodLiteral<Month>[]];

export const MonthYearSchema = z.object({
  year: z.int({ error: 'analytics.validation.yearInteger' }).min(2000, { error: 'analytics.validation.yearMin' }),
  month: z.union(monthLiterals, 'analytics.validation.invalidMonth'),
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
      ctx.addIssue({ code: 'custom', path: ['dateTo'], message: 'analytics.validation.dateToBeforeFrom' });
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
      ctx.addIssue({ code: 'custom', path: ['dateTo'], message: 'analytics.validation.dateToBeforeFrom' });
    }
  });

export const CategoryBreakdownFilterSchema = MonthRangeSchema;

export const PlanVsActualFilterSchema = MonthYearSchema;

export type MonthYear = z.infer<typeof MonthYearSchema>;
export type MonthRange = z.infer<typeof MonthRangeSchema>;
export type MonthlyIncomeExpensesFilter = z.infer<typeof MonthlyIncomeExpensesFilterSchema>;
export type CategoryBreakdownFilter = z.infer<typeof CategoryBreakdownFilterSchema>;
export type PlanVsActualFilter = z.infer<typeof PlanVsActualFilterSchema>;
