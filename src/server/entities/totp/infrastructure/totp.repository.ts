import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class TotpRepository extends CrudApiRepository<TotpOrm, never, Omit<TotpOrm, DefaultColumnKeys | 'user'>> {
  constructor() {
    super(TotpOrm, 'TotpOrm');
  }

  findByUserId(userId: number): Promise<TotpOrm | null> {
    return this.repository.findOne({
      where: { userId },
    });
  }
}

export const totpRepository = new TotpRepository();
