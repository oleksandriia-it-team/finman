import { describe, expect, it, vi } from 'vitest';
import { LookupsService } from '../lookups.service';
import { LookupsTypeEnum } from '../../../app/api/lookups/shared/enums/lookups-type.enum';

vi.stubGlobal('fetch', vi.fn());

describe('LookupsService', () => {
  const service = new LookupsService();

  it('should fetch list of items', async () => {
    const mockResponse = {
      status: 200,
      data: [ { id: 1, name: 'Test Item' } ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await service.getItems(LookupsTypeEnum.Languages, 1, 10, {});

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      '/api/lookups/languages/get-items',
      expect.objectContaining({
        body: JSON.stringify({ from: 1, to: 10, filters: {} }),
      })
    );
  });

  it('should fetch a single item by ID', async () => {
    const mockResponse = {
      status: 200,
      data: { id: 1, name: 'Test Item' },
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await service.getItem(LookupsTypeEnum.Languages, 1);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      '/api/lookups/languages/get-by-id',
      expect.objectContaining({
        body: JSON.stringify({ id: 1 }),
      })
    );
  });

  it('should fetch total count of items', async () => {
    const mockResponse = {
      status: 200,
      data: 100,
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await service.getTotalCount(LookupsTypeEnum.Languages, {});

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      '/api/lookups/languages/get-total-items',
      expect.objectContaining({
        body: JSON.stringify({ filters: {} }),
      })
    );
  });

  it('should throw an error for 400 status', async () => {
    const mockErrorResponse = {
      status: 400,
      message: 'Bad Request',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    } as Response);

    await expect(service.getItem(LookupsTypeEnum.Languages, 1)).rejects.toEqual(mockErrorResponse);
  });

  it('should throw an error for 500 status', async () => {
    const mockErrorResponse = {
      status: 500,
      message: 'Internal Server Error',
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    } as Response);

    await expect(service.getItems(LookupsTypeEnum.Languages, 1, 10, {})).rejects.toEqual(mockErrorResponse);
  });
});