import { type FindOptionsWhere, MoreThan } from 'typeorm';
import { RecoveryCodeOrm } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';
import { CrudApiRepository } from '@backend/database/crud.api.repository';
import type { CreateRecoveryCodeDto } from '@common/domains/auth/schema/recovery-code.dto';
import type { ValidationResult } from '@backend/entities/recovery-code/model/validation.model';

export class RecoveryCodeRepository extends CrudApiRepository<RecoveryCodeOrm, never, CreateRecoveryCodeDto> {
  constructor() {
    super(RecoveryCodeOrm);
  }
  async validateAndGetCode(email: string, code: string): Promise<ValidationResult> {
    const MAX_ATTEMPTS = 3;

    const record = await this.repository.findOneBy({
      email,
      expiresAt: MoreThan(new Date()),
    });

    if (!record) return { status: 'not_found' };

    if (record.attempts >= MAX_ATTEMPTS) {
      await this.repository.delete(record.id);
      return { status: 'attempts_exceeded' };
    }

    if (record.code === code) {
      return { status: 'valid', record };
    }

    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set({ attempts: () => 'attempts + 1' })
      .where('id = :id', { id: record.id })
      .andWhere('attempts < :maxAttempts', { maxAttempts: MAX_ATTEMPTS })
      .returning('attempts')
      .execute();

    const updatedRow = updateResult.raw[0];
    if (!updatedRow || updatedRow.attempts >= MAX_ATTEMPTS) {
      await this.repository.delete(record.id);
      return { status: 'attempts_exceeded' };
    }
    const remaining = MAX_ATTEMPTS - updatedRow.attempts;
    return { status: 'invalid_code', remainingAttempts: remaining };
  }
  async deleteUserCodes(email: string): Promise<void> {
    const whereCondition: FindOptionsWhere<RecoveryCodeOrm> = { email };
    await this.repository.delete(whereCondition);
  }
}

export const recoveryCodeRepository = new RecoveryCodeRepository();
