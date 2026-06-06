import { type FindOptionsWhere, MoreThan } from 'typeorm';
import { RecoveryCodeOrm } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';
import { CrudApiRepository } from '@backend/database/crud.api.repository';
import type { CreateRecoveryCodeDto } from '@common/domains/auth/schema/recovery-code.dto';
import type { ValidationResult } from '@backend/entities/recovery-code/application/validation.model';
import { MaxAttempts } from '@common/constants/recovery-code-attempts.constant';
import { RecoveryValidationStatus } from '@common/enums/recovery-status.enum';

export class RecoveryCodeRepository extends CrudApiRepository<RecoveryCodeOrm, never, CreateRecoveryCodeDto> {
  constructor() {
    super(RecoveryCodeOrm, 'recovery_codes');
  }
  async validateAndGetCode(email: string, code: string): Promise<ValidationResult> {
    const record = await this.repository.findOneBy({
      email,
      expiresAt: MoreThan(new Date()),
    });

    if (!record) return { status: RecoveryValidationStatus.NotFound };

    if (record.attempts >= MaxAttempts) {
      await this.repository.delete(record.id);
      return { status: RecoveryValidationStatus.AttemptsExceeded };
    }

    if (record.code === code) {
      return { status: RecoveryValidationStatus.Valid, record };
    }

    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set({ attempts: () => 'attempts + 1' })
      .where('id = :id', { id: record.id })
      .andWhere('attempts < :maxAttempts', { maxAttempts: MaxAttempts })
      .returning('attempts')
      .execute();

    const updatedRow = updateResult.raw[0];
    if (!updatedRow || updatedRow.attempts >= MaxAttempts) {
      await this.repository.delete(record.id);
      return { status: RecoveryValidationStatus.AttemptsExceeded };
    }
    const remaining = MaxAttempts - updatedRow.attempts;
    return { status: RecoveryValidationStatus.InvalidCode, remainingAttempts: remaining };
  }
  async deleteUserCodes(email: string): Promise<void> {
    const whereCondition: FindOptionsWhere<RecoveryCodeOrm> = { email };
    await this.repository.delete(whereCondition);
  }
}

export const recoveryCodeRepository = new RecoveryCodeRepository();
