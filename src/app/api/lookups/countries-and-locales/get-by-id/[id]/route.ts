import { createRoute } from '@backend/shared/utils/create-route.util';
import { getIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';

export const GET = createRoute({
  paramsTransformers: (context) => ({
    id: getIntegerParamPipe(context.id, 1),
  }),
  execute: async ({ params: { id } }) => {
    return {
      status: 200,
      data: await countryRepository.getItemById(id),
    };
  },
  filter: getDefaultApiErrorFilter,
});
