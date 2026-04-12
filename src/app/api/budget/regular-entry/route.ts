import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RegularEntrySchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { OwnsRegularEntryGuard } from '@backend/entities/regular-entry/application/owns-regular-entry.guard';

export const POST = createRoute({
  schema: RegularEntrySchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context, body }) => {
    const userId = context as number;

    await regularEntryApiRepository.createItem({ ...body, userId });

    return {
      status: 200,
      data: true,
    };
  },
});

export const PUT = createRoute({
  schema: RegularEntrySchema,
  contextFn: GetUserIdTransformer,
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  guards: [AuthGuard],
  execute: async ({ context, body, params: { id } }) => {
    const userId = context as number;

    await regularEntryApiRepository.updateItem(id, { ...body, userId });

    return {
      status: 200,
      data: true,
    };
  },
});

export const GET = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    regularEntry: await regularEntryApiRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context: { userId, regularEntry } }) => OwnsRegularEntryGuard(regularEntry, userId as number)],
  execute: async ({ context }) => {
    return {
      status: 200,
      data: context.regularEntry,
    };
  },
});

export const DELETE = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    regularEntry: await regularEntryApiRepository.getItemById(params.id),
  }),
  guards: [
    AuthGuard,
    ({ context: { userId, regularEntry } }) => OwnsRegularEntryGuard(regularEntry, userId as number, true),
  ],
  execute: async ({ params: { id } }) => {
    await regularEntryApiRepository.deleteItem(id);

    return {
      status: 200,
      data: true,
    };
  },
});
