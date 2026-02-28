import { NextResponse } from 'next/server';
import { CreateRouteConfig, ReturnRouteExecute, RouteContext, RouteContextParams } from '../models/create-route.model';
import { ApiResultOperation } from '../../../common/models/api-result-operation.model';
import { z, ZodTypeAny } from 'zod';
import { getZodErrorMessage } from './get-zod-error-message.util';
import { getErrorMessage } from '../../../common/utils/get-error-message.util';

export function createRoute<TR, BTR, R, TP = RouteContextParams, Schema extends ZodTypeAny | undefined = undefined>(
  config: CreateRouteConfig<Schema, TR, BTR, R, TP>,
): ReturnRouteExecute<R> {
  const { guards = [], guardsBeforeTransformers, schema, transformers, paramsTransformers, execute, filter } = config;

  return async (request: Request, context?: RouteContext): Promise<NextResponse<ApiResultOperation<R>>> => {
    let rawParams = context?.params || {};
    if (rawParams instanceof Promise) {
      rawParams = await rawParams;
    }

    let transformedParams = rawParams as unknown as TP;

    try {
      if (paramsTransformers) {
        const ptResult = paramsTransformers(rawParams as RouteContextParams);
        transformedParams = (ptResult instanceof Promise ? await ptResult : ptResult) as TP;
      }
    } catch (e) {
      if (filter) {
        return filter(e as Error);
      }

      return NextResponse.json({ status: 500, message: getErrorMessage(e) }, { status: 500 });
    }

    let resultBeforeTransformers = guardsBeforeTransformers?.(request, transformedParams);

    if (resultBeforeTransformers instanceof Promise) {
      resultBeforeTransformers = await resultBeforeTransformers;
    }

    let body: z.infer<Schema> | undefined = undefined;

    if (schema) {
      try {
        const json = await request.json();
        const schemaResult = schema.safeParse(json);

        if (!schemaResult.success) {
          return NextResponse.json(getZodErrorMessage(schemaResult), { status: 400 });
        }
        body = schemaResult.data as z.infer<Schema>;
      } catch {
        return NextResponse.json({ status: 400, message: 'Invalid JSON' }, { status: 400 });
      }
    }

    for (const guardFn of guards) {
      const result = await guardFn({
        request,
        beforeGuardTransformers: resultBeforeTransformers as BTR,
        body: body as never,
        params: transformedParams,
      });
      if (result) return NextResponse.json(result, { status: result.status });
    }

    let resultTransformers = transformers?.(request, body as never, transformedParams);

    if (resultTransformers instanceof Promise) {
      resultTransformers = await resultTransformers;
    }

    try {
      return await execute({
        request,
        body: body as never,
        transformers: resultTransformers as TR,
        beforeGuardTransformers: resultBeforeTransformers as BTR,
        params: transformedParams,
      });
    } catch (e) {
      if (filter) {
        return filter(e as Error);
      }

      return NextResponse.json({ status: 500, message: getErrorMessage(e) }, { status: 500 });
    }
  };
}
