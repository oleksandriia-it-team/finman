import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LookupsService } from '../lookups.service';
import { DatabaseResultOperation } from '../../../shared/models/database-result-operation.model';
import { Language } from '../../../app/api/lookups/languages/shared/models/languages.model';
import { LookupsTypeEnum } from '../../../app/api/lookups/shared/enums/lookups-type.enum';

// TODO update later
describe('LookupsService', () => {
  let lookupsService: LookupsService;

  beforeEach(() => {
    lookupsService = new LookupsService();
  })

  it('should return a language with id = 1', async () => {
    const dto = { id: 1, name: 'English', code: 'en' };
    vi.spyOn(lookupsService, 'fetchLookups' as never).mockReturnValue(Promise.resolve({ status: 200, data: dto } as DatabaseResultOperation<Language>));

    const result = await lookupsService.getItem(LookupsTypeEnum.Languages, 1);

    expect(result).toEqual({
      status: 200,
      data: dto
    })
  });
})