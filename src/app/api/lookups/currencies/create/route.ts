import { createRoute } from '@backend/shared/utils/create-route.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';
import { CurrencyFormSchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export const POST = createRoute({
  schema: CurrencyFormSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, context }) => {
    const userId = context as number;

    const id = await currencyRepository.createItem({
      currencyName: body.name,
      currencyCode: body.code,
      currencySymbol: body.symbol,
      adminId: userId,
    });

    return { status: 200, data: id };
  },
});
