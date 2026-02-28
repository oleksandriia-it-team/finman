import { z } from 'zod';
import { isEmpty } from '../../../common/utils/is-empty.util';

const intSchema = z.coerce.number().int();

export function getIntegerParamPipe(value: string | string[], min?: number): number {
  const val = Array.isArray(value) ? value[0] : value;

  let schema = intSchema;

  if (!isEmpty(min)) {
    schema = schema.min(min);
  }

  const result = schema.safeParse(val);

  if (!result.success) {
    throw Error('One of params is invalid integer');
  }

  return result.data as number;
}
