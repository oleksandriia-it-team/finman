export type ApiResultOperation<T> = ApiResultOperationSuccess<T> | ApiResultOperationError;

export interface ApiResultOperationSuccess<T> {
  status: 200;
  data: T;
}

export interface ApiResultOperationError {
  status: 400 | 500;
  message: string;
}
