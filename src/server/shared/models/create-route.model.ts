import { ApiResultOperation, ApiResultOperationError } from '../../../common/models/api-result-operation.model';
import { NextResponse } from 'next/server';
import { z, ZodTypeAny } from 'zod';

export type RouteContextParams = Record<string, string | string[]>;
export type RouteContext = { params: Promise<RouteContextParams> | RouteContextParams };

export type GuardResult =
  | ApiResultOperationError
  | null
  | undefined
  | Promise<ApiResultOperationError | null | undefined>;

export type RouteGuard<BTR, BODY, TP> = (params: RouteGuardParams<BTR, BODY, TP>) => GuardResult;

export interface CreateRouteConfig<
  Schema extends ZodTypeAny | undefined,
  TR,
  BTR,
  R,
  TP = RouteContextParams,
  BODY = Schema extends ZodTypeAny ? z.infer<Schema> : undefined,
> {
  schema?: Schema;
  execute: RouteExecute<TR, BTR, BODY, R, TP>;
  guards?: RouteGuard<BTR, BODY, TP>[];
  guardsBeforeTransformers?: (request: Request, params: TP) => BTR | Promise<BTR>;
  transformers?: (request: Request, body: BODY, params: TP) => TR | Promise<TR>;
  paramsTransformers?: (params: RouteContextParams) => TP | Promise<TP>;
  filter?: FilterRouteExecute<R>;
}

export interface RouteParams<TR, BTR, BODY, TP> {
  request: Request;
  body: BODY;
  beforeGuardTransformers: BTR;
  transformers: TR;
  params: TP;
}

export interface RouteGuardParams<BTR, BODY, TP> {
  request: Request;
  body: BODY;
  beforeGuardTransformers: BTR;
  params: TP;
}

export type RouteExecute<TR, BTR, BODY, R, TP> = (
  params: RouteParams<TR, BTR, BODY, TP>,
) => Promise<NextResponse<ApiResultOperation<R>>> | NextResponse<ApiResultOperation<R>>;

export type FilterRouteExecute<R> = (
  err: Error,
) => Promise<NextResponse<ApiResultOperation<R>>> | NextResponse<ApiResultOperation<R>>;

export type ReturnRouteExecute<R> = (
  request: Request,
  context: RouteContext,
) => Promise<NextResponse<ApiResultOperation<R>>>;
