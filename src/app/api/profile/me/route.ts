import { createRoute } from '@backend/shared/utils/create-route.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { ProfileSettingsSchema } from '@common/domains/profile/schema/profile-settings.schema';

export const GET = createRoute({
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context }) => {
    const userId = context as number;

    const user = await userApiRepository.getItemById(userId);

    if (!user) {
      return {
        status: 404,
        message: 'Дані користувача не знайдені',
      };
    }

    return {
      status: 200,
      data: user,
    };
  },
  filter: getDefaultApiErrorFilter,
});

export const PUT = createRoute({
  schema: ProfileSettingsSchema,
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ body, context }) => {
    const userId = context as number;

    if (body.currentPassword || body.newPassword || body.confirmPassword) {
      const isPasswordValid = await userApiRepository.isPasswordValid(userId, body.currentPassword ?? '');

      if (!isPasswordValid) {
        return {
          status: 400,
          message: 'Поточний пароль невірний',
        };
      }
    }

    const user = await userApiRepository.updateProfileSettings(userId, {
      name: body.name,
      locale: body.locale,
      language: body.language,
      ...(body.newPassword ? { password: body.newPassword } : {}),
    });

    if (!user) {
      return {
        status: 404,
        message: 'Дані користувача не знайдені',
      };
    }

    return {
      status: 200,
      data: user,
    };
  },
  filter: getDefaultApiErrorFilter,
});
