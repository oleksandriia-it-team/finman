import { ApiError } from '@frontend/shared/models/api-error.model';

export async function handleResponse<T>(response: Response): Promise<T> {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok || (data && data.status >= 400)) {
    const error: ApiError = {
      message: data?.message || response.statusText || 'Помилка запиту',
      status: data?.status || response.status,
      code: data?.code,
    };
    throw error;
  }

  return data as T;
}
