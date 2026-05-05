import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { ExistCountryGuard } from '@backend/entities/country/application/exist-country.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { RoleGuard } from '@backend/entities/user/infrastructure/role.guard';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';

export const DELETE = createRoute({
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    role: await GetUserRoleTransformer(request),
    country: await countryRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, RoleGuard(RoleEnum.Admin), ({ context }) => ExistCountryGuard(context.country)],
  execute: async ({ params: { id } }) => {
    await countryRepository.deleteItem(id, true);
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
