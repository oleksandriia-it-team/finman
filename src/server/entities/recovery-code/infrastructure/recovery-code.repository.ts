import { type FindOptionsWhere, MoreThan } from 'typeorm';
import { RecoveryCode } from '@backend/entities/recovery-code/infrastructure/recovery-code.orm';
import { CrudApiRepository } from '@backend/database/crud.api.repository';
import type { CreateRecoveryCodeDto } from '@common/domains/auth/schema/recovery-code.dto';
import type { ValidationResult } from '@backend/entities/recovery-code/model/validation.model';

export class RecoveryCodeRepository extends CrudApiRepository<RecoveryCode, never, CreateRecoveryCodeDto> {
  constructor() {
    super(RecoveryCode);
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

    if (record.code !== code) {
      const newAttempts = record.attempts + 1;

      if (newAttempts >= MAX_ATTEMPTS) {
        await this.repository.delete(record.id);
        return { status: 'attempts_exceeded' };
      }
      await this.repository.update(record.id, { attempts: newAttempts });
      return { status: 'invalid_code', remainingAttempts: MAX_ATTEMPTS - newAttempts };
    }
    return { status: 'valid', record };
  }
  async deleteUserCodes(email: string): Promise<void> {
    const whereCondition: FindOptionsWhere<RecoveryCode> = { email };
    await this.repository.delete(whereCondition);
  }
}

export const recoveryCodeRepository = new RecoveryCodeRepository();
