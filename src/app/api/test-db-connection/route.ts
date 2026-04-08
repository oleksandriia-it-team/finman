import { createRoute } from '@backend/shared/utils/create-route.util';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const GET = createRoute({
  execute: async () => {
    const res = await userApiRepository.getItems(0, 50);

    console.log(res);

    return { status: 200, data: 200 };
  },
});
