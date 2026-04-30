import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { CountryFormSchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const POST = createRoute({
  schema: CountryFormSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, context }) => {
    const userId = context as number;
    const admin = await userApiRepository.getItemById(userId);

    const id = await countryRepository.createItem({
      country: body.countryName,
      locale: body.localeName,
      adminName: admin?.name ?? 'System',
    } as unknown as Parameters<typeof countryRepository.createItem>[0]);

    return { status: 200, data: id };
  },
  filter: getDefaultApiErrorFilter,
});
