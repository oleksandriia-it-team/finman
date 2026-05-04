import { z } from 'zod';
import { isEmpty } from '@common/utils/is-empty.util';
import { AppError } from '@common/classes/app-error.class';

const intSchema = z.coerce.number().int();

export function GetIntegerParamPipe(value: string | string[], min?: number): number {
  const val = Array.isArray(value) ? value[0] : value;

  let schema = intSchema;

  if (!isEmpty(min)) {
    schema = schema.min(min);
  }

  const result = schema.safeParse(val);

  if (!result.success) {
    throw new AppError('Один з параметрів не є цілим числом');
  }

  return result.data as number;
}
