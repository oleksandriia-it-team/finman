import { ApiResultOperation, ApiResultOperationError } from '../../../common/models/api-result-operation.model';
import { NextResponse } from 'next/server';
import { z, ZodTypeAny } from 'zod';

export type GuardResult =
  | ApiResultOperationError
  | null
  | undefined
  | Promise<ApiResultOperationError | null | undefined>;

export type RouteGuard<BTR, BODY> = (params: RouteGuardParams<BTR, BODY>) => GuardResult;

export interface CreateRouteConfig<
  Schema extends ZodTypeAny | undefined,
  TR,
  BTR,
  R,
  BODY = Schema extends ZodTypeAny ? z.infer<Schema> : undefined,
> {
  schema?: Schema;
  execute: RouteExecute<TR, BTR, BODY, R>;
  guards?: RouteGuard<BTR, BODY>[];
  guardsBeforeTransformers?: (request: Request) => BTR | Promise<BTR>;
  transformers?: (request: Request, body: BODY) => TR | Promise<TR>;
  filter?: FilterRouteExecute<R>;
}

export interface RouteParams<TR, BTR, BODY> {
  request: Request;
  body: BODY;
  beforeGuardTransformers: BTR;
  transformers: TR;
}

export interface RouteGuardParams<BTR, BODY> {
  request: Request;
  body: BODY;
  beforeGuardTransformers: BTR;
}

export type RouteExecute<TR, BTR, BODY, R> = (
  params: RouteParams<TR, BTR, BODY>,
) => Promise<NextResponse<ApiResultOperation<R>>> | NextResponse<ApiResultOperation<R>>;

export type FilterRouteExecute<R> = (
  err: Error,
) => Promise<NextResponse<ApiResultOperation<R>>> | NextResponse<ApiResultOperation<R>>;

export type ReturnRouteExecute<R> = (request: Request) => Promise<NextResponse<ApiResultOperation<R>>>;
