import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RegularEntrySchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';

export const POST = createRoute({
  schema: RegularEntrySchema,
  guardsBeforeTransformers: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ beforeGuardTransformers, body }) => {
    const userId = beforeGuardTransformers as number;

    await regularEntryApiRepository.createItem({ ...body, userId });

    return {
      status: 200,
      data: true,
    };
  },
});
