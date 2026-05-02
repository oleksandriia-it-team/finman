import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LookupsService } from '../lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';

vi.stubGlobal('fetch', vi.fn());

describe('LookupsService', () => {
  const service = new LookupsService();
  const jsonResponse = (body: unknown, ok = true) =>
    ({
      ok,
      status: (body as { status?: number }).status ?? (ok ? 200 : 500),
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => body,
    }) as Response;

  beforeEach(() => {
    document.cookie = 'token=test-token';
    vi.mocked(fetch).mockReset();
  });

  it('should fetch list of items', async () => {
    const mockResponse = {
      status: 200,
      data: [{ id: 1, name: 'Test Item' }],
    };

    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(mockResponse));

    const result = await service.getItems(LookupsTypeEnum.Currency, 1, 10, {});

    expect(result).toEqual(mockResponse.data);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/lookups/currencies/get-items'),
      expect.objectContaining({
        body: JSON.stringify({ from: 1, to: 10, filters: {} }),
      }),
    );
  });

  it('should fetch a single item by ID', async () => {
    const mockResponse = {
      status: 200,
      data: { id: 1, name: 'Test Item' },
    };

    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(mockResponse));

    const result = await service.getItem(LookupsTypeEnum.Currency, 1);

    expect(result).toEqual(mockResponse.data);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/lookups/currencies/get-by-id/1'),
      expect.objectContaining({
        method: 'GET',
        signal: null,
      }),
    );
  });

  it('should fetch total count of items', async () => {
    const mockResponse = {
      status: 200,
      data: 100,
    };

    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(mockResponse));

    const result = await service.getTotalCount(LookupsTypeEnum.Currency, {});

    expect(result).toEqual(mockResponse.data);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/lookups/currencies/get-total-items'),
      expect.objectContaining({
        body: JSON.stringify({ filters: {} }),
      }),
    );
  });

  it('should throw an error for 400 status', async () => {
    const mockErrorResponse = {
      status: 400,
      message: 'Bad Request',
    };

    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(mockErrorResponse, false));

    await expect(service.getItem(LookupsTypeEnum.Currency, 1)).rejects.toMatchObject({
      message: mockErrorResponse.message,
    });
  });

  it('should throw an error for 500 status', async () => {
    const mockErrorResponse = {
      status: 500,
      message: 'Internal Server Error',
    };

    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(mockErrorResponse, false));

    await expect(service.getItems(LookupsTypeEnum.Currency, 1, 10, {})).rejects.toMatchObject({
      message: mockErrorResponse.message,
    });
  });
});
