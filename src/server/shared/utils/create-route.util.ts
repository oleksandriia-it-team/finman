import { NextResponse } from 'next/server';
import {
  type CreateRouteConfig,
  type ReturnRouteExecute,
  type RouteContext,
  type RouteContextParams,
} from '../models/create-route.model';
import { type ApiResultOperation } from '@common/models/api-result-operation.model';
import { type z, type ZodTypeAny } from 'zod';
import { getZodErrorMessage } from '@common/utils/get-zod-error-message.util';
import { ErrorTexts } from '@common/constants/error-texts.contant';

const unknownErrorResponse = () =>
  NextResponse.json({ status: 500, message: ErrorTexts.UnknownError }, { status: 500 });

async function resolveParams<TP>(
  context: RouteContext | undefined,
  paramsFn: ((params: RouteContextParams) => TP | Promise<TP>) | undefined,
): Promise<{ ok: true; params: TP } | { ok: false; error: unknown }> {
  let rawParams = context?.params || {};
  if (rawParams instanceof Promise) rawParams = await rawParams;

  if (!paramsFn) return { ok: true, params: rawParams as TP };

  try {
    const result = paramsFn(rawParams as RouteContextParams);
    return { ok: true, params: (result instanceof Promise ? await result : result) as TP };
  } catch (error) {
    return { ok: false, error };
  }
}

async function resolveBody<Schema extends ZodTypeAny | undefined>(
  request: Request,
  schema: Schema | undefined,
): Promise<{ ok: true; body: z.infer<Schema> | undefined } | { ok: false; response: NextResponse }> {
  if (!schema) return { ok: true, body: undefined };

  try {
    const json = await request.json();
    const schemaResult = schema.safeParse(json);

    if (!schemaResult.success) {
      return { ok: false, response: NextResponse.json(getZodErrorMessage(schemaResult), { status: 400 }) };
    }

    return { ok: true, body: schemaResult.data as z.infer<Schema> };
  } catch {
    return { ok: false, response: NextResponse.json({ status: 400, message: 'Невалідний JSON' }, { status: 400 }) };
  }
}

async function runGuards<TR, BTR, TP>(
  guards: CreateRouteConfig<ZodTypeAny, TR, BTR, unknown, TP>['guards'],
  request: Request,
  context: BTR,
  body: unknown,
  params: TP,
): Promise<NextResponse | null> {
  for (const guardFn of guards ?? []) {
    const result = await guardFn({ request, context, body: body as never, params });
    if (result) return NextResponse.json(result, { status: result.status });
  }
  return null;
}

async function resolveContext<BTR, TP>(
  contextFn: ((request: Request, params: TP) => BTR | Promise<BTR>) | undefined,
  request: Request,
  params: TP,
): Promise<BTR | undefined> {
  let contextData = contextFn?.(request, params);
  if (contextData instanceof Promise) contextData = await contextData;
  return contextData;
}

async function resolveData<TR, TP>(
  dataFn: ((request: Request, body: never, params: TP) => TR | Promise<TR>) | undefined,
  request: Request,
  body: never,
  params: TP,
): Promise<TR | undefined> {
  let dataTransformed = dataFn?.(request, body, params);
  if (dataTransformed instanceof Promise) dataTransformed = await dataTransformed;
  return dataTransformed;
}

export function createRoute<TR, BTR, R, TP = RouteContextParams, Schema extends ZodTypeAny | undefined = undefined>(
  config: CreateRouteConfig<Schema, TR, BTR, R, TP>,
): ReturnRouteExecute<R> {
  const { guards = [], contextFn, schema, dataFn, paramsFn, execute, filter } = config;

  return async (request: Request, context?: RouteContext): Promise<NextResponse<ApiResultOperation<R>>> => {
    const paramsResult = await resolveParams<TP>(context, paramsFn);
    if (!paramsResult.ok) {
      return filter
        ? filter(paramsResult.error as Error)
        : (unknownErrorResponse() as NextResponse<ApiResultOperation<R>>);
    }

    const transformedParams = paramsResult.params;
    const contextData = await resolveContext<BTR, TP>(contextFn, request, transformedParams);

    const bodyResult = await resolveBody(request, schema);
    if (!bodyResult.ok) return bodyResult.response as NextResponse<ApiResultOperation<R>>;

    const body = bodyResult.body;

    const guardResponse = await runGuards(
      guards as CreateRouteConfig<ZodTypeAny, TR, BTR, unknown, TP>['guards'],
      request,
      contextData as BTR,
      body,
      transformedParams,
    );
    if (guardResponse) return guardResponse as NextResponse<ApiResultOperation<R>>;

    const dataTransformed = await resolveData<TR, TP>(dataFn, request, body as never, transformedParams);

    try {
      const result = await execute({
        request,
        body: body as never,
        data: dataTransformed as TR,
        context: contextData as BTR,
        params: transformedParams,
      });

      return NextResponse.json(result, { status: result.status });
    } catch (e) {
      return filter ? filter(e as Error) : (unknownErrorResponse() as NextResponse<ApiResultOperation<R>>);
    }
  };
}
