import { createRoute } from '../../../server/shared/utils/create-route.util';
import { NextResponse } from 'next/server';
import { adminApiRepository } from '../../../server/entities/admin/infrastructure/admin.repository';

export const GET = createRoute({
  execute: async () => {
    const res = await adminApiRepository.getItems(0, 50);

    console.log(res);

    return NextResponse.json({ status: 200, data: 200 });
  },
});
