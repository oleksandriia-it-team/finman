import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { NextResponse } from 'next/server';
import { getApiErrorMessage } from '@common/utils/get-api-error-message.util';

export function getDefaultApiErrorFilter(err: Error): NextResponse<ApiResultOperationError> {
  const message = getApiErrorMessage(err);

  return NextResponse.json(message, { status: message.status });
}
