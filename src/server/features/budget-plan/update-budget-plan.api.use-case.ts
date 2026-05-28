import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import {
  budgetPlanRepository,
  type BudgetPlanRepository,
} from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import {
  monthEntryRepository,
  type MonthEntryRepository,
} from '@backend/entities/month-entry/infrastructure/month-entry.repository';
import { AppError } from '@common/classes/app-error.class';
import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import { typeormTransactionManager } from '@backend/database/transaction.manager';
import type { MonthEntry } from '@common/records/month-entry.record';
import {
  plannedRegOpsBudgetRepository,
  type PlannedRegOpsBudgetRepository,
} from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.repository';
import {
  regularEntryApiRepository,
  type RegularEntryApiRepository,
} from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { assertOwnedIds } from '@backend/shared/utils/assert-owned-ids.util';

type UpdateBudgetPlanInput = BudgetPlanDto & { userId: number; id: number; currentOtherEntries: MonthEntry[] };

export class UpdateBudgetPlanApiUseCase extends TransactionalUseCase<UpdateBudgetPlanInput, true> {
  constructor(
    private readonly budgetPlanRepository: BudgetPlanRepository,
    private readonly monthEntryRepository: MonthEntryRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetRepository,
    private readonly regularEntryRepository: RegularEntryApiRepository,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected override async handle({
    otherEntries: otherEntriesDto,
    plannedRegularEntryIds,
    currentOtherEntries,
    id: budgetPlanId,
    userId,
    ...data
  }: UpdateBudgetPlanInput): Promise<true> {
    const uniquePlannedIds = await assertOwnedIds(
      this.regularEntryRepository.repository,
      userId,
      plannedRegularEntryIds,
      'Деякі ID планових регулярних операцій не існують або не належать користувачу',
    );

    const currentEntryIds = currentOtherEntries.map((e) => e.id);

    const dtoIdsWithValue = otherEntriesDto.map((e) => e.id).filter((id): id is number => typeof id === 'number');
    const foreignOrMissingIds = dtoIdsWithValue.filter((id) => !currentEntryIds.includes(id));

    if (foreignOrMissingIds.length > 0) {
      throw new AppError(
        "Деякі записи місячних операцій вже прив'язані до іншого бюджетного плану або не існують з вказаним ID",
        403,
      );
    }

    const {
      deletedRecords: deletedIds,
      newRecords: newEntriesDto,
      remainedRecords: remainedIds,
    } = getNewAndDeletedRecords(otherEntriesDto, currentEntryIds);

    const remainedEntriesDto = otherEntriesDto.filter((dto) => dto.id && remainedIds.includes(dto.id));

    await Promise.all(
      remainedEntriesDto.map((dto) => {
        const defCategory = getDefaultCategory(dto.type);
        return this.monthEntryRepository.repository.update(dto.id as number, {
          ...dto,
          description: dto.description ?? '',
          id: dto.id as number,
          category: dto.category ?? defCategory,
          budgetPlanId: budgetPlanId,
        });
      }),
    );

    if (deletedIds.length > 0) {
      await this.monthEntryRepository.repository.delete(deletedIds);
    }

    if (newEntriesDto.length > 0) {
      const newEntries = newEntriesDto.map(({ id: _, ...dto }) => {
        const defCategory = getDefaultCategory(dto.type);
        return this.monthEntryRepository.repository.create({
          ...dto,
          description: dto.description ?? '',
          category: dto.category ?? defCategory,
          budgetPlanId: budgetPlanId,
        });
      });
      await this.monthEntryRepository.repository.save(newEntries);
    }

    await this.plannedRegOpsBudgetRepository.repository.delete({ budgetPlanId });

    await this.budgetPlanRepository.repository.save({
      ...data,
      userId,
      id: budgetPlanId,
    });

    if (uniquePlannedIds.length > 0) {
      await this.plannedRegOpsBudgetRepository.repository.save(
        uniquePlannedIds.map((id) =>
          this.plannedRegOpsBudgetRepository.repository.create({ regularOperationId: id, budgetPlanId }),
        ),
      );
    }

    return true as const;
  }
}

export const updateBudgetPlanApiUseCase = new UpdateBudgetPlanApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  plannedRegOpsBudgetRepository,
  regularEntryApiRepository,
  typeormTransactionManager,
);
