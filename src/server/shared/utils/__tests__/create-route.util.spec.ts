import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createRoute } from '../create-route.util';
import { ApiResultOperation } from '../../../../common/models/api-result-operation.model';

describe('createRoute', () => {
  let request: Request;

  beforeEach(() => {
    request = new Request('http://localhost:3000/api/test', {
      method: 'GET',
    });
  });

  it('should execute main function without any middleware', async () => {
    const expectResult = { data: 1, status: 200 } satisfies ApiResultOperation<any>;

    const executeFn = vi.fn(() => {
      return NextResponse.json(expectResult);
    });

    const route = createRoute({
      execute: executeFn,
    });

    const response = await route(request);
    const json = await response.json();

    expect(executeFn).toHaveBeenCalledOnce();
    expect(json).toMatchObject(expectResult);
  });

  it('should pass transformers result to execute', async () => {
    const expectResult = { data: 'success', status: 200 } satisfies ApiResultOperation<any>;
    const transformValue = { userId: 123 };

    const transformFn = vi.fn(() => transformValue);

    const executeFn = vi.fn(({ transformers }: any) => {
      expect(transformers).toEqual(transformValue);
      return NextResponse.json(expectResult);
    });

    const route = createRoute({
      transformers: transformFn,
      execute: executeFn,
    });

    await route(request);

    expect(transformFn).toHaveBeenCalledOnce();
    expect(executeFn).toHaveBeenCalledOnce();
  });

  it('should pass guardsBeforeTransformers result to guards and execute', async () => {
    const preContext = { role: 'admin' };

    const guardsBeforeFn = vi.fn(() => preContext);

    const guardFn = vi.fn(({ beforeGuardTransformers }: any) => {
      expect(beforeGuardTransformers).toEqual(preContext);
      return null;
    });

    const executeFn = vi.fn(({ beforeGuardTransformers }: any) => {
      expect(beforeGuardTransformers).toEqual(preContext);
      return NextResponse.json({ status: 200, data: 1 } satisfies ApiResultOperation<any>);
    });

    const route = createRoute({
      guardsBeforeTransformers: guardsBeforeFn,
      guards: [guardFn],
      execute: executeFn,
    });

    await route(request);

    expect(guardsBeforeFn).toHaveBeenCalled();
    expect(guardFn).toHaveBeenCalled();
    expect(executeFn).toHaveBeenCalled();
  });

  it('should block execution if guard fails', async () => {
    const errorResult = { status: 403, message: 'Forbidden' } satisfies ApiResultOperation<any>;

    const guardFn = vi.fn(() => errorResult);
    const executeFn = vi.fn(() => NextResponse.json({ status: 200, data: 1 } satisfies ApiResultOperation<any>));

    const route = createRoute({
      guards: [guardFn],
      execute: executeFn,
    });

    const response = await route(request);
    const json = await response.json();

    expect(guardFn).toHaveBeenCalled();
    expect(executeFn).not.toHaveBeenCalled();
    expect(response.status).toBe(403);
    expect(json).toEqual(errorResult);
  });

  it('should parse and validate JSON body via schema', async () => {
    const schema = z.object({ name: z.string() });
    const bodyData = { name: 'Alice' };

    request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify(bodyData),
    });

    const executeFn = vi.fn(({ body }: any) => {
      expect(body).toEqual(bodyData);
      return NextResponse.json({ status: 200, data: 1 } satisfies ApiResultOperation<any>);
    });

    const route = createRoute({
      schema,
      execute: executeFn,
    });

    await route(request);
    expect(executeFn).toHaveBeenCalled();
  });

  it('should return 400 if schema validation fails', async () => {
    const schema = z.object({ age: z.number({ message: 'Validation Error' }) });

    request = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ age: 'invalid' }),
    });

    const executeFn = vi.fn();

    const route = createRoute({
      schema,
      execute: executeFn,
    });

    const response = await route(request);

    expect(executeFn).not.toHaveBeenCalled();
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.message).toBe('Validation Error');
  });

  it('should return 400 if JSON is malformed', async () => {
    const schema = z.object({ any: z.string() });

    request.json = vi.fn().mockRejectedValue(new Error('Unexpected token'));

    const route = createRoute({
      schema,
      execute: vi.fn(),
    });

    const response = await route(request);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.message).toBe('Invalid JSON');
  });

  it('should catch errors in execute and use filter if provided', async () => {
    const error = new Error('Database failed');
    const executeFn = vi.fn(() => {
      throw error;
    });

    const filterFn = vi.fn((e: Error) => {
      return NextResponse.json(
        { status: 503, message: 'Custom Error: ' + e.message } satisfies ApiResultOperation<any>,
        { status: 503 },
      );
    });

    const route = createRoute({
      execute: executeFn,
      filter: filterFn,
    });

    const response = await route(request);

    expect(filterFn).toHaveBeenCalledWith(error);
    expect(response.status).toBe(503);
  });
});
