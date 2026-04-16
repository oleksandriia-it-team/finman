import { z } from 'zod';

export const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .default('http://localhost:3000')
    .superRefine((val, ctx) => {
      let url: URL;

      try {
        url = new URL(val);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'API URL має бути валідним URL (наприклад, http://localhost:3000)',
        });
        return;
      }

      const isHttps = url.protocol === 'https:';
      const isLocalHttp = url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');

      if (!isHttps && !isLocalHttp) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            process.env.NODE_ENV === 'production'
              ? 'У продакшні дозволено лише https://'
              : 'Дозволено лише https:// або http://localhost / http://127.0.0.1',
        });
      }
    }),
});
