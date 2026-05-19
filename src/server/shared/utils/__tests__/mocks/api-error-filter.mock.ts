import type { AppError } from '@common/classes/app-error.class';

export const mockApiErrorFilter = (
  // @ts-expect-error for testing purposes only
  req: Request,
  err: Error,
) => {
  const status = (err as unknown as AppError).status ?? 500;

  return Response.json(
    {
      status,
      message: err.message || 'Unknown error',
    },
    {
      status,
    },
  ) as never;
};
