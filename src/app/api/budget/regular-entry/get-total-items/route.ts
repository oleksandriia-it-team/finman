import { createRoute } from '@backend/shared/utils/create-route.util';
import { RegularEntryPaginationSchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';

export const POST = createRoute({
  contextFn: GetUserIdTransformer,
  schema: RegularEntryPaginationSchema.totalCountSchema,
  guards: [AuthGuard],
  execute: async ({ context, body: { filters } }) => {
    const userId = context as number;

    return {
      status: 200,
      data: await regularEntryApiRepository.getTotalCount({
        ...filters,
        softDeleted: filters?.softDeleted as 0 | 1 | undefined,
        userId,
      }),
    };
  },
  filter: getDefaultApiErrorFilter,
});
