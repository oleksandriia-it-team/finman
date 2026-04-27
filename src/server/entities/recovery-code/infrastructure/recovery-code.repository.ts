import { type FindOptionsWhere, MoreThan } from 'typeorm';
import { RecoveryCode } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';
import { CrudApiRepository } from '@backend/database/crud.api.repository';
import type { CreateRecoveryCodeDto } from '@common/domains/auth/schema/recovery-code.dto';

export class RecoveryCodeRepository extends CrudApiRepository<RecoveryCode, never, CreateRecoveryCodeDto> {
  constructor() {
    super(RecoveryCode);
  }
  async findValidCode(email: string, code: string): Promise<RecoveryCode | null> {
    const whereCondition: FindOptionsWhere<RecoveryCode> = {
      email,
      code,
      expiresAt: MoreThan(new Date()),
    };

    return await this.repository.findOneBy(whereCondition);
  }

  async deleteUserCodes(email: string): Promise<void> {
    const whereCondition: FindOptionsWhere<RecoveryCode> = { email };
    await this.repository.delete(whereCondition);
  }
}

export const recoveryCodeRepository = new RecoveryCodeRepository();
