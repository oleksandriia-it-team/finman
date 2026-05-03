import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { NextResponse } from 'next/server';
import { getApiErrorMessage } from '@backend/shared/utils/get-api-error-message.util';
import { isDevMode } from '@common/utils/is-dev-mode.util';

export function getDefaultApiErrorFilter(err: Error): NextResponse<ApiResultOperationError> {
  const message = getApiErrorMessage(err);

  if (isDevMode()) {
    console.error(err);
  }

  return NextResponse.json(message, { status: message.status });
}
