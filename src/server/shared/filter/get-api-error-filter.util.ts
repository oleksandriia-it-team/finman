import { ApiResultOperationError } from '../../../common/models/api-result-operation.model';
import { getApiErrorMessage } from '../utils/get-api-error-message.util';
import { NextResponse } from 'next/server';

export function getDefaultApiErrorFilter(err: Error): NextResponse<ApiResultOperationError> {
  const message = getApiErrorMessage(err);

  return NextResponse.json(message, { status: message.status });
}
