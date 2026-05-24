import { subDays } from 'date-fns';
import type { IUseCase } from '@common/models/use-case.model';
import type { ITrackingOperationStatisticSource } from '@common/domains/tracking-operation/models/tracking-operation.repository.model';

export interface GetFactIncreaseStatisticInput {
  userId?: number;
}

export interface GetFactIncreaseStatisticDto {
  increaseFactExpensesLastMonth: number;
  increaseFactIncomesLastMonth: number;
}

function calcPercentChange(current: number, previous: number): number {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export class GetFactIncreaseStatisticCommonUseCase implements IUseCase<
  GetFactIncreaseStatisticInput,
  GetFactIncreaseStatisticDto
> {
  constructor(private readonly trackingOperationRepository: ITrackingOperationStatisticSource) {}

  async execute(input: GetFactIncreaseStatisticInput): Promise<GetFactIncreaseStatisticDto> {
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const sixtyDaysAgo = subDays(now, 60);

    const baseFilters = {
      softDeleted: 0 as const,
      ...(input.userId !== undefined ? { userId: input.userId } : {}),
    };

    const [current, previous] = await Promise.all([
      this.trackingOperationRepository.getStatistic({
        ...baseFilters,
        dateFrom: thirtyDaysAgo,
        dateTo: now,
      }),
      this.trackingOperationRepository.getStatistic({
        ...baseFilters,
        dateFrom: sixtyDaysAgo,
        dateTo: thirtyDaysAgo,
      }),
    ]);

    return {
      increaseFactExpensesLastMonth: calcPercentChange(current.totalOutcomes, previous.totalOutcomes),
      increaseFactIncomesLastMonth: calcPercentChange(current.totalIncomes, previous.totalIncomes),
    };
  }
}
