import { createRoute } from '../../../server/shared/utils/create-route.util';
import { NextResponse } from 'next/server';
import { adminRepository } from '../../../server/entities/admin/infrastructure/admin.repository';

export const GET = createRoute({
  execute: async () => {
    const res = await adminRepository.getItems(0, 50);

    console.log(res);

    return NextResponse.json({ status: 200, data: 200 });
  },
});
