export type DatabaseResultOperation<T> = DatabaseResultOperationSuccess<T> | DatabaseResultOperationError;

export interface DatabaseResultOperationSuccess<T> {
  status: 200;
  data: T;
}

export interface DatabaseResultOperationError {
  status: 400 | 500;
  message: string;
}
