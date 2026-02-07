import { adminRepository } from '../../../server/entities/admin/infrastructure/admin.repository';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await adminRepository.getItems(0, 50);

  console.log(res);

  return NextResponse.json(200);
}
