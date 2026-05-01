import { describe, expect, it, vi, beforeEach } from 'vitest';
import { LookupsService } from '../lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';

vi.stubGlobal('fetch', vi.fn());

describe('LookupsService', () => {
  const service = new LookupsService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch list of items', async () => {
    const mockResponse = {
      status: 200,
      data: [{ id: 1, name: 'Test Item' }],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockResponse,
    } as Response);

    const result = await service.getItems(LookupsTypeEnum.Currency, 1, 10, {});

    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch a single item by ID', async () => {
    const mockResponse = {
      status: 200,
      data: { id: 1, name: 'Test Item' },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockResponse,
    } as Response);

    const result = await service.getItem(LookupsTypeEnum.Currency, 1);

    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch total count of items', async () => {
    const mockResponse = {
      status: 200,
      data: 100,
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockResponse,
    } as Response);

    const result = await service.getTotalCount(LookupsTypeEnum.Currency, {});

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error for 400 status', async () => {
    const mockErrorResponse = {
      status: 400,
      message: 'Bad Request',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockErrorResponse,
    } as Response);

    await expect(service.getItem(LookupsTypeEnum.Currency, 1)).rejects.toMatchObject({
      message: 'Bad Request',
      status: 400,
    });
  });

  it('should throw an error for 500 status', async () => {
    const mockErrorResponse = {
      status: 500,
      message: 'Internal Server Error',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => mockErrorResponse,
    } as Response);

    await expect(service.getItems(LookupsTypeEnum.Currency, 1, 10, {})).rejects.toMatchObject({
      message: 'Internal Server Error',
      status: 500,
    });
  });
});
