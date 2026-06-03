import type { ErrorMessageParams } from '@common/constants/error-texts.constant';

export class AppError extends Error {
  constructor(
    message: string,
    public status: number = 400,
    public messageParams?: ErrorMessageParams,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
