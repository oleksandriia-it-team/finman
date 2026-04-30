import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';
import { CurrencyFormSchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const POST = createRoute({
  schema: CurrencyFormSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, context }) => {
    const userId = context as number;
    const admin = await userApiRepository.getItemById(userId);

    const id = await currencyRepository.createItem({
      currencyName: body.name,
      currencyCode: body.code,
      currencySymbol: body.symbol,
      adminName: admin?.name ?? 'System',
    } as unknown as Parameters<typeof currencyRepository.createItem>[0]);

    return { status: 200, data: id };
  },
  filter: getDefaultApiErrorFilter,
});
