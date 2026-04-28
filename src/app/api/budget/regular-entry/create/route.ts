import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RegularEntrySchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';

export const POST = createRoute({
  schema: RegularEntrySchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;

    const defCategory =
      'type' in body && body.type === TypeEntry.Income ? IncomeCategories.Misc : ExpenseCategories.Misc;

    const id = await regularEntryApiRepository.createItem({
      ...body,
      category: body.category ?? defCategory,
      userId,
    });

    return {
      status: 200,
      data: id,
    };
  },
  filter: getDefaultApiErrorFilter,
});
