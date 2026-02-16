import { NextResponse } from 'next/server';
import { getZodErrorMessage } from './get-zod-error-message.util';
import { CreateRouteConfig, ReturnRouteExecute } from '../models/create-route.model';
import { getErrorMessage } from '../../../common/utils/get-error-message.util';
import { ApiResultOperation } from '../../../common/models/api-result-operation.model';
import { ZodTypeAny } from 'zod';

export function createRoute<TR, BTR, R, BODY extends ZodTypeAny | undefined>(
  config: CreateRouteConfig<BODY, TR, BTR, R>,
): ReturnRouteExecute<R> {
  const { guards = [], guardsBeforeTransformers, schema, transformers, execute, filter } = config;

  return async (request: Request): Promise<NextResponse<ApiResultOperation<R>>> => {
    let resultBeforeTransformers = guardsBeforeTransformers?.(request);

    if (resultBeforeTransformers instanceof Promise) {
      resultBeforeTransformers = await resultBeforeTransformers;
    }

    let body: BODY | undefined = undefined;

    if (schema) {
      try {
        const json = await request.json();
        const schemaResult = schema.safeParse(json);

        if (!schemaResult.success) {
          return NextResponse.json(getZodErrorMessage(schemaResult), { status: 400 });
        }
        body = schemaResult.data as BODY;
      } catch (e) {
        return NextResponse.json({ status: 400, message: 'Invalid JSON' }, { status: 400 });
      }
    }

    for (const guardFn of guards) {
      const result = await guardFn({
        request,
        beforeGuardTransformers: resultBeforeTransformers as BTR,
        body: body as never,
      });
      if (result) return NextResponse.json(result, { status: result.status });
    }

    let resultTransformers = transformers?.(request);

    if (resultTransformers instanceof Promise) {
      resultTransformers = await resultTransformers;
    }

    try {
      return execute({
        request,
        body: body as never,
        transformers: resultTransformers as TR,
        beforeGuardTransformers: resultBeforeTransformers as BTR,
      });
    } catch (e) {
      if (filter) {
        return filter(e as Error);
      }

      return NextResponse.json({ status: 500, message: getErrorMessage(e) }, { status: 500 });
    }
  };
}
