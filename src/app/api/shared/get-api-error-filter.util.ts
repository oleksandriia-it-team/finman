import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { NextResponse } from 'next/server';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export async function getDefaultApiErrorFilter(
  req: Request,
  err: Error,
): Promise<NextResponse<ApiResultOperationError>> {
  const message = getSafeAppError(err);

  if (message.status === 500) {
    void (async () => {
      try {
        const userId = await GetUserIdTransformer(req);

        await errorLogApiRepository.repository.save({
          message: err.message || 'Unknown error',
          stack: err.stack || null,
          endpoint: req?.url ? new URL(req.url).pathname : null,
          method: req?.method || null,
          userId: userId || null,
        });
      } catch (dbError) {
        console.error('Failed to save error log to DB:', dbError);
      }
    })();

    return NextResponse.json({ status: 500, message: 'Unknown error' }, { status: 500 });
  }

  return NextResponse.json(message, { status: message.status });
}
