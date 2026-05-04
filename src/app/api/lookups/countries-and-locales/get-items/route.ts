import { CountriesAndLocalesSchema } from '@common/domains/lookups/schemas/countries-and-locales.schema';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export const POST = createRoute({
  schema: CountriesAndLocalesSchema.itemsSchema,
  contextFn: GetUserRoleTransformer,
  execute: async ({ body, context: role }) => {
    return {
      status: 200,
      data: await countryRepository.getItems(body.from, body.to, body.filters, role === RoleEnum.Admin),
    };
  },
  filter: getDefaultApiErrorFilter,
});
