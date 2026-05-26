import { type FindOptionsRelations, type FindOptionsWhere, type Repository } from 'typeorm';
import { isEmpty } from '@common/utils/is-empty.util';
import { monthEntryRepository } from '@backend/entities/month-entry/infrastructure/month-entry.repository';
import { AppError } from '@common/classes/app-error.class';
import { plannedRegOpsBudgetRepository } from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.repository';
import { type BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';

type FitAttachConditionsProps = {
  attachedPlannedMonthEntryId: number | null;
  attachedPlannedRegEntryId: number | null;
  userId: number;
  date: Date;
};

type HasBudgetPlan = { id: number; budgetPlan?: BudgetPlanOrm };

async function assertAttachedFits<T extends HasBudgetPlan>(opts: {
  repository: Repository<T>;
  id: number;
  userId: number;
  date: Date;
  notFoundMessage: string;
  dateMismatchMessage: string;
}): Promise<void> {
  const { repository, id, userId, date, notFoundMessage, dateMismatchMessage } = opts;

  const exist = await repository.findOne({
    where: { budgetPlan: { userId }, id } as FindOptionsWhere<T>,
    relations: { budgetPlan: true } as FindOptionsRelations<T>,
  });

  if (!exist) {
    throw new AppError(notFoundMessage, 403);
  }

  const isFitDate = exist.budgetPlan?.month === date.getMonth() && exist.budgetPlan?.year === date.getFullYear();

  if (!isFitDate) {
    throw new AppError(dateMismatchMessage, 403);
  }
}

export async function assertFitAttachConditions({
  attachedPlannedRegEntryId,
  attachedPlannedMonthEntryId,
  date,
  userId,
}: FitAttachConditionsProps): Promise<void> {
  if (!isEmpty(attachedPlannedMonthEntryId) && !isEmpty(attachedPlannedRegEntryId)) {
    throw new AppError(
      'Не можна прикріпити одночасно і планову операцію місяця, і планову операцію регулярного бюджету',
      403,
    );
  }

  if (!isEmpty(attachedPlannedMonthEntryId)) {
    await assertAttachedFits({
      repository: monthEntryRepository.repository,
      id: attachedPlannedMonthEntryId,
      userId,
      date,
      notFoundMessage: 'Запис місячної операції з таким ID не існує або не належить користувачу',
      dateMismatchMessage: "Дата операції не відповідає місяцю, до якого прив'язана планова операція місяця",
    });
  }

  if (!isEmpty(attachedPlannedRegEntryId)) {
    await assertAttachedFits({
      repository: plannedRegOpsBudgetRepository.repository,
      id: attachedPlannedRegEntryId,
      userId,
      date,
      notFoundMessage: 'Запис регулярної операції з таким ID не існує або не належить користувачу',
      dateMismatchMessage:
        "Дата операції не відповідає місяцю, до якого прив'язана планова операція регулярного бюджету",
    });
  }
}
