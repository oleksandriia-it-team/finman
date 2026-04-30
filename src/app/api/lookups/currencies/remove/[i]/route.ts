import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { ExistCurrencyGuard } from '@backend/entities/currency/application/exist-currency.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export const DELETE = createRoute({
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    currency: await currencyRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context }) => ExistCurrencyGuard(context.currency)],
  execute: async ({ params: { id } }) => {
    await currencyRepository.deleteItem(id, true);
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
