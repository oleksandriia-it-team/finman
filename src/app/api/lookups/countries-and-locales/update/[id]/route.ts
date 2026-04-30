import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { UpdateCountrySchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export const PATCH = createRoute({
  schema: UpdateCountrySchema,
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, params: { id } }) => {
    const updateData: Record<string, unknown> = {};

    if (body.countryName !== undefined) updateData.country = body.countryName;
    if (body.localeName !== undefined) updateData.locale = body.localeName;
    if (body.softDeleted !== undefined) updateData.softDeleted = body.softDeleted;

    await countryRepository.updateItem(id, updateData as unknown as Parameters<typeof countryRepository.updateItem>[1]);

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
