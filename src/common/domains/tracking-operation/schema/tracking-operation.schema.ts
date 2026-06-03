import { z } from 'zod';
import { TypeEntry } from '@common/enums/entry.enum';
import { AllCategoryValues, ExpenseCategories } from '@common/enums/categories.enum';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';
import { getDate } from '@common/utils/get-date.util';
import { dateField } from '@common/schema-fields/date-required-field.schema';
import { isEmpty } from '@common/utils/is-empty.util';

const TrackingOperationTypes = [TypeEntry.Income, TypeEntry.Expense] as const;

export interface TrackingOperationValidationMessages {
  titleRequired: string;
  titleMaxLength: string;
  descriptionMaxLength: string;
  typeInvalid: string;
  dateRequired: string;
  sumNotNumber: string;
  sumMin: string;
  attachedIdInteger: string;
  cannotAttachBoth: string;
}

export const DEFAULT_TRACKING_OPERATION_MESSAGES: TrackingOperationValidationMessages = {
  titleRequired: 'tracking.validation.titleRequired',
  titleMaxLength: 'tracking.validation.titleMaxLength',
  descriptionMaxLength: 'tracking.validation.descriptionMaxLength',
  typeInvalid: 'tracking.validation.typeInvalid',
  dateRequired: 'tracking.validation.dateRequired',
  sumNotNumber: 'tracking.validation.sumNotNumber',
  sumMin: 'tracking.validation.sumMin',
  attachedIdInteger: 'tracking.validation.attachedIdInteger',
  cannotAttachBoth: 'tracking.validation.cannotAttachBoth',
};

export function createTrackingOperationSchema(
  messages: TrackingOperationValidationMessages = DEFAULT_TRACKING_OPERATION_MESSAGES,
) {
  return z
    .object({
      title: z.string().min(1, { message: messages.titleRequired }).max(20, { message: messages.titleMaxLength }),
      description: z.string().max(100, { message: messages.descriptionMaxLength }).nullable().optional(),
      type: z.enum(TrackingOperationTypes, {
        message: messages.typeInvalid,
      }),
      date: dateField(messages.dateRequired),
      sum: z.coerce.number({ message: messages.sumNotNumber }).min(1, { message: messages.sumMin }),
      category: z.enum(AllCategoryValues).default(ExpenseCategories.Misc),
      attachedPlannedRegEntryId: z.int({ message: messages.attachedIdInteger }).nullable().optional(),
      attachedPlannedMonthEntryId: z.int({ message: messages.attachedIdInteger }).nullable().optional(),
    })
    .superRefine((data, ctx) => {
      if (!isEmpty(data.attachedPlannedMonthEntryId) && !isEmpty(data.attachedPlannedRegEntryId)) {
        ctx.addIssue({
          code: 'custom',
          message: messages.cannotAttachBoth,
        });
      }
    });
}

// Server-side schema with English defaults
export const TrackingOperationSchema = createTrackingOperationSchema();

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
      ctx.addIssue({ code: 'custom', path: ['dateTo'], message: 'admin.validation.dateRangeInvalid' });
    }
    if (data.minSum !== undefined && data.maxSum !== undefined && data.minSum > data.maxSum) {
      ctx.addIssue({ code: 'custom', path: ['maxSum'], message: 'admin.validation.sumRangeInvalid' });
    }
  });

const basePaginatedSchema = createPaginatedSchema(TrackingOperationFilterSchema);
export type TrackingOperationFilterFormData = z.infer<typeof TrackingOperationFilterSchema>;

export const TrackingOperationPaginationSchema = {
  ...basePaginatedSchema,
  itemsSchema: basePaginatedSchema.itemsSchema.superRefine((data, ctx) => {
    if (data.to < data.from) {
      ctx.addIssue({ code: 'custom', path: ['to'], message: 'admin.validation.paginationRangeInvalid' });
    }
  }),
};

export type TrackingOperationFormData = z.infer<typeof TrackingOperationSchema>;
