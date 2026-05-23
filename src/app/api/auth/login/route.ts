import { LoginSchema } from '@common/domains/auth/schema/login.schema';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { loginApiUseCase } from '@backend/features/auth/login.api.use-case';

export const POST = createRoute({
  schema: LoginSchema,
  execute: async ({ body }) => {
    return {
      status: 200,
      data: await loginApiUseCase.execute(body),
    };
  },
  filter: getDefaultApiErrorFilter,
});
