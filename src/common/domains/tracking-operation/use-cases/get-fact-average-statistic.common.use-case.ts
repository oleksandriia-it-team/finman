import { differenceInCalendarMonths } from 'date-fns';
import type { IUseCase } from '@common/models/use-case.model';
import type { ITrackingOperationStatisticSource } from '@common/domains/tracking-operation/models/tracking-operation.repository.model';

export interface GetFactAverageStatisticInput {
  userId?: number;
}

export interface GetFactAverageStatisticDto {
  factAverageExpenses: number;
  factAverageIncomes: number;
}

export class GetFactAverageStatisticCommonUseCase implements IUseCase<
  GetFactAverageStatisticInput,
  GetFactAverageStatisticDto
> {
  constructor(private readonly trackingOperationRepository: ITrackingOperationStatisticSource) {}

  async execute(input: GetFactAverageStatisticInput): Promise<GetFactAverageStatisticDto> {
    const filters = {
      softDeleted: 0 as const,
      ...(input.userId !== undefined ? { userId: input.userId } : {}),
    };

    const [statistic, earliestDate] = await Promise.all([
      this.trackingOperationRepository.getStatistic(filters),
      this.trackingOperationRepository.getEarliestDate(filters),
    ]);

    // +1 because a record on the same calendar month should still count as one month
    const monthsSpan = earliestDate ? Math.max(1, differenceInCalendarMonths(new Date(), earliestDate) + 1) : 1;

    return {
      factAverageIncomes: statistic.totalIncomes / monthsSpan,
      factAverageExpenses: statistic.totalOutcomes / monthsSpan,
    };
  }
}
