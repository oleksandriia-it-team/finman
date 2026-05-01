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
import { AppError } from '@common/classes/api-error.class';
import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import { typeormTransactionManager } from '@backend/database/transaction.manager';
import {
  type RegularEntryApiRepository,
  regularEntryApiRepository,
} from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { Not } from 'typeorm';

type UpdateBudgetPlanInput = BudgetPlanDto & { userId: number; id: number };

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
    userId,
    id: budgetPlanId,
    ...data
  }: UpdateBudgetPlanInput): Promise<true> {
    const currentBudgetPlan = await this.budgetPlanRepository.repository.findOne({
      where: { id: budgetPlanId, userId },
      relations: ['otherEntries'],
    });

    if (!currentBudgetPlan) {
      throw new AppError('Бюджетний план не найдено', 404);
    }

    const currentEntryIds = currentBudgetPlan.otherEntries.map((e) => e.id);

    const {
      deletedRecords: deletedIds,
      newRecords: newEntriesDto,
      remainedRecords: remainedIds,
    } = getNewAndDeletedRecords(otherEntriesDto, currentEntryIds);

    const monthEntriesFromAnotherBudgetPlan = await this.monthEntryRepository.repository.find({
      where: remainedIds.map((id) => ({ id, budgetPlanId: Not(budgetPlanId) })),
    });

    if (monthEntriesFromAnotherBudgetPlan.length > 0) {
      throw new AppError("Деякі записи місячних операцій вже прив'язані до іншого бюджетного плану");
    }

    const remainedEntriesDto = otherEntriesDto.filter((dto) => dto.id && remainedIds.includes(dto.id));

    await Promise.all(
      remainedEntriesDto.map((dto) => {
        const defCategory = getDefaultCategory(dto.type);
        return this.monthEntryRepository.repository.update(dto.id as number, {
          ...dto,
          id: dto.id as number,
          category: dto.category ?? defCategory,
          budgetPlanId: currentBudgetPlan.id,
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
          budgetPlanId: currentBudgetPlan.id,
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
