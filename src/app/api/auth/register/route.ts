import { createRoute } from '@backend/shared/utils/create-route.util';
import { RegisterDto, RegisterSchema } from '@common/domains/auth/schema/register.schema';
import { NextResponse } from 'next/server';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const POST = createRoute({
  schema: RegisterSchema,
  execute: async ({ body }: { body: RegisterDto }) => {
    const isEmailTaken = await userApiRepository.findUserForLogin(body.email);
    const isNameTaken = await userApiRepository.findUserForLogin(body.name);

    if (isEmailTaken) {
      return NextResponse.json({ status: 400, code: 'EMAIL_ALREADY_EXISTS', message: 'This email already exist' });
    }

    if (isNameTaken) {
      return NextResponse.json({ status: 400, code: 'NAME_ALREADY_EXISTS', message: 'This name already exist' });
    }

    await userApiRepository.createItem({ ...body, role: RoleEnum.User });

    return NextResponse.json({ status: 200, data: { success: true } });
  },
});
