import { CurrenciesSchema } from '@common/domains/lookups/schemas/currencies.schema';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export const POST = createRoute({
  schema: CurrenciesSchema.itemsSchema,
  contextFn: GetUserRoleTransformer,
  execute: async ({ body, context: role }) => {
    return {
      status: 200,
      data: await currencyRepository.getItems(body.from, body.to, body.filters, role === RoleEnum.Admin),
    };
  },
  filter: getDefaultApiErrorFilter,
});
