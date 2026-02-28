import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { createRoute } from '../create-route.util';
import { RouteContext } from '../../models/create-route.model';
import { getDefaultApiErrorFilter } from '../../filter/get-api-error-filter.util';
import { ApiResultOperation } from '../../../../common/models/api-result-operation.model';

describe('createRoute with params', () => {
  let request: Request;

  beforeEach(() => {
    request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    });
  });

  it('should transform params and pass them to execute', async () => {
    const rawParams = { id: '123' };
    const transformedParams = { id: 123 };
    const context: RouteContext = { params: rawParams };

    const paramsTransformers = vi.fn((p) => ({
      id: Number(p.id),
    }));

    const executeFn = vi.fn(({ params }) => {
      expect(params).toEqual(transformedParams);
      return NextResponse.json({ status: 200, data: params } satisfies ApiResultOperation<number>);
    });

    const route = createRoute({
      paramsTransformers,
      execute: executeFn,
    });

    await route(request, context);

    expect(paramsTransformers).toHaveBeenCalledWith(rawParams);
    expect(executeFn).toHaveBeenCalledOnce();
  });

  it('should handle async params (Next.js 15 style)', async () => {
    const rawParams = { slug: 'hello' };
    const context: RouteContext = { params: Promise.resolve(rawParams) };

    const executeFn = vi.fn(({ params }) => {
      expect(params).toEqual(rawParams);
      return NextResponse.json({ status: 200, data: 1 } satisfies ApiResultOperation<number>);
    });

    const route = createRoute({
      execute: executeFn,
    });

    await route(request, context);

    expect(executeFn).toHaveBeenCalled();
  });

  it('should pass transformed params to guards and transformers', async () => {
    const context: RouteContext = { params: { code: 'abc' } };

    const paramsTransformers = (p: { code: string }) => ({ code: p.code.toUpperCase() });

    const guardsBeforeFn = vi.fn((_: Request, params) => {
      expect(params.code).toBe('ABC');
      return { ok: true };
    });

    const guardFn = vi.fn(({ params }) => {
      expect(params.code).toBe('ABC');
      return null;
    });

    const transformersFn = vi.fn((_: Request, __: object, params) => {
      expect(params.code).toBe('ABC');
      return { transformed: true };
    });

    const route = createRoute({
      paramsTransformers: paramsTransformers as never,
      guardsBeforeTransformers: guardsBeforeFn,
      guards: [guardFn],
      transformers: transformersFn as never,
      execute: () => NextResponse.json({ status: 200, data: 1 }),
    });

    await route(request, context);

    expect(guardsBeforeFn).toHaveBeenCalled();
    expect(guardFn).toHaveBeenCalled();
    expect(transformersFn).toHaveBeenCalled();
  });

  it('should return 400 if params transformation throws an error', async () => {
    const paramsTransformers = () => {
      throw new Error('Invalid integer parameter');
    };

    const route = createRoute({
      paramsTransformers,
      execute: vi.fn(),
      filter: getDefaultApiErrorFilter,
    });

    const response = await route(request, { params: { id: 'not-a-number' } });
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.message).toBe('Invalid integer parameter');
  });

  it('should work without params provided', async () => {
    const executeFn = vi.fn(({ params }) => {
      expect(params).toEqual({});
      return NextResponse.json({ status: 200, data: 1 } satisfies ApiResultOperation<number>);
    });

    const route = createRoute({
      execute: executeFn,
    });

    await route(request, { params: {} });
    expect(executeFn).toHaveBeenCalled();
  });
});
