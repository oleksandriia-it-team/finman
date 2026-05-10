import { getDate } from '@common/utils/get-date.util';
import z from 'zod';

export const dateField = (errorMessage: string) => z.preprocess(getDate, z.date({ error: errorMessage }));
