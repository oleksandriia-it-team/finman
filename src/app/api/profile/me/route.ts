import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const GET = createRoute({
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context }) => {
    const userId = context as number;

    const user = await userApiRepository.getItemById(userId);

    if (!user) {
      return {
        status: 401,
        message: 'Дані користувача не знайдені',
      };
    }

    return {
      status: 200,
      data: user,
    };
  },
});
