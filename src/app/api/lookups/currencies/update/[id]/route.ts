import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';
import { UpdateCurrencySchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { ExistCurrencyGuard } from '@backend/entities/currency/application/exist-currency.guard';

export const PUT = createRoute({
  schema: UpdateCurrencySchema,
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    currency: await currencyRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context }) => ExistCurrencyGuard(context.currency)],
  execute: async ({ body, context, params: { id } }) => {
    const existing = context.currency!;

    await currencyRepository.updateItem(id, {
      currencyName: body.name ?? existing.currencyName,
      currencyCode: body.code ?? existing.currencyCode,
      currencySymbol: body.symbol ?? existing.currencySymbol,
    });

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
