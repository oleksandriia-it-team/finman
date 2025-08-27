import { describe, it, expect, vi } from 'vitest';
import POST from '../get-by-id/route';
import { getItem } from '../../shared/utils/get-item.util';
import { DatabaseResultOperationError } from '../../../../../shared/models/database-result-operation.model';

vi.mock('../../shared/utils/get-item.util', () => ({
  getItem: vi.fn(),
}));

const mockLanguage = {
  id: 1,
  name: 'English',
};

describe('POST /api/lookups/languages/get-by-id', () => {

  it('returns Language for valid request', async () => {
    vi.mocked(getItem).mockResolvedValueOnce(mockLanguage);

    const request = new Request('http://localhost/api/lookups/languages/get-by-id', {
      method: 'POST',
      body: JSON.stringify({ id: 1 }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({
      status: 200,
      data: mockLanguage,
    });
  });

  it('returns an error for invalid payload', async () => {
    const request = new Request('http://localhost/api/lookups/languages/get-by-id', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      status: 400,
      message: 'Id is required and must be a number',
    });
  });

  it('returns an error when an exception occurs', async () => {
    vi.mocked(getItem).mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const request = new Request('http://localhost/api/lookups/languages/get-by-id', {
      method: 'POST',
      body: JSON.stringify({ id: 1 }),
    });

    const response = await POST(request);

    const jsonResponse: DatabaseResultOperationError = await response.json();

    expect(jsonResponse).toEqual({
      status: 400,
      message: 'Database error',
    });
  });
});