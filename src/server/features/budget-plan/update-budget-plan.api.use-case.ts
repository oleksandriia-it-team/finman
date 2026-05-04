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
import {
  type RegularEntryApiRepository,
  regularEntryApiRepository,
} from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import type { MonthEntry } from '@common/records/month-entry.record';

type UpdateBudgetPlanInput = BudgetPlanDto & { userId: number; id: number; currentOtherEntries: MonthEntry[] };

export class UpdateBudgetPlanApiUseCase extends TransactionalUseCase<UpdateBudgetPlanInput, true> {
  constructor(
    private budgetPlanRepository: BudgetPlanRepository,
    private monthEntryRepository: MonthEntryRepository,
    private plannedRegularEntryRepository: RegularEntryApiRepository,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected override async handle({
    otherEntries: otherEntriesDto,
    plannedRegularEntryIds,
    currentOtherEntries,
    id: budgetPlanId,
    ...data
  }: UpdateBudgetPlanInput): Promise<true> {
    const currentEntryIds = currentOtherEntries.map((e) => e.id);

    const {
      deletedRecords: deletedIds,
      newRecords: newEntriesDto,
      remainedRecords: remainedIds,
    } = getNewAndDeletedRecords(otherEntriesDto, currentEntryIds);

    const monthEntriesFromAnotherBudgetPlan = remainedIds.filter((id) => !currentEntryIds.includes(id));

    if (monthEntriesFromAnotherBudgetPlan.length > 0) {
      throw new AppError(
        "Деякі записи місячних операцій вже прив'язані до іншого бюджетного плану або не існують з вказаним ID",
        403,
      );
    }

    const remainedEntriesDto = otherEntriesDto.filter((dto) => dto.id && remainedIds.includes(dto.id));

    await Promise.all(
      remainedEntriesDto.map((dto) => {
        const defCategory = getDefaultCategory(dto.type);
        return this.monthEntryRepository.repository.update(dto.id as number, {
          ...dto,
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
          category: dto.category ?? defCategory,
          budgetPlanId: budgetPlanId,
        });
      });
      await this.monthEntryRepository.repository.save(newEntries);
    }

    await this.budgetPlanRepository.repository.save({
      ...data,
      id: budgetPlanId,
      plannedRegularEntries: plannedRegularEntryIds.map((id) =>
        this.plannedRegularEntryRepository.repository.create({ id }),
      ),
    });

    return true as const;
  }
}

export const updateBudgetPlanApiUseCase = new UpdateBudgetPlanApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  regularEntryApiRepository,
  typeormTransactionManager,
);
