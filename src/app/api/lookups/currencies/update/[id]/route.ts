import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';
import { UpdateCurrencySchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';

export const PATCH = createRoute({
  schema: UpdateCurrencySchema,
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  guards: [AuthGuard],
  execute: async ({ body, params: { id } }) => {
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.currencyName = body.name;
    if (body.code !== undefined) updateData.currencyCode = body.code;
    if (body.symbol !== undefined) updateData.currencySymbol = body.symbol;
    if (body.softDeleted !== undefined) updateData.softDeleted = body.softDeleted;

    await currencyRepository.updateItem(
      id,
      updateData as unknown as Parameters<typeof currencyRepository.updateItem>[1],
    );

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
