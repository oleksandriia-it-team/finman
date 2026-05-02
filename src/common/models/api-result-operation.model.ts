export type ApiResultOperation<T> = ApiResultOperationSuccess<T> | ApiResultOperationError;

export interface ApiResultOperationSuccess<T> {
  status: 200;
  data: T;
}

export interface ApiResultOperationError {
  status: 400 | 401 | 403 | 404 | 409 | 500 | 503;
  message: string;
}
