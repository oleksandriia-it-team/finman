import { createRoute } from '@backend/shared/utils/create-route.util';
import { ErrorTexts } from '@common/constants/error-texts.constant';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { ProfileSettingsSchema } from '@common/domains/profile/schema/profile-settings.schema';
import type { OnlineUser } from '@common/records/user.record';

export const GET = createRoute({
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context }) => {
    const userId = context as number;

    const user = await userApiRepository.getItemById(userId);

    if (!user) {
      return {
        status: 404,
        message: ErrorTexts.UserDataNotFound,
      };
    }

    const { totp, password: _, ...safeUser } = user;

    return {
      status: 200,
      data: {
        ...safeUser,
        totpEnabled: !!totp?.enabled,
      } satisfies OnlineUser,
    };
  },
  filter: getDefaultApiErrorFilter,
});

export const DELETE = createRoute({
  contextFn: GetUserIdTransformer,
  guards: [AuthGuard],
  execute: async ({ context }) => {
    const userId = context as number;

    const deleted = await userApiRepository.deleteAccount(userId);

    if (!deleted) {
      return {
        status: 404,
        message: ErrorTexts.UserDataNotFound,
      };
    }

    return {
      status: 200,
      data: { success: true },
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
          message: ErrorTexts.WrongCurrentPassword,
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
        message: ErrorTexts.UserDataNotFound,
      };
    }

    return {
      status: 200,
      data: user,
    };
  },
  filter: getDefaultApiErrorFilter,
});
