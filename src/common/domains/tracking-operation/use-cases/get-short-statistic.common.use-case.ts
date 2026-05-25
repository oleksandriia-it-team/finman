import type { IUseCase } from '@common/models/use-case.model';
import type {
  GetShortStatisticResponse,
  ITrackingOperationStatisticSource,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import { GetFactAverageStatisticCommonUseCase } from './get-fact-average-statistic.common.use-case';
import { GetFactIncreaseStatisticCommonUseCase } from './get-fact-increase-statistic.common.use-case';

export interface GetShortStatisticInput {
  userId?: number;
}

export class GetShortStatisticCommonUseCase implements IUseCase<GetShortStatisticInput, GetShortStatisticResponse> {
  private readonly factAverageUseCase: GetFactAverageStatisticCommonUseCase;
  private readonly factIncreaseUseCase: GetFactIncreaseStatisticCommonUseCase;

  constructor(trackingOperationRepository: ITrackingOperationStatisticSource) {
    this.factAverageUseCase = new GetFactAverageStatisticCommonUseCase(trackingOperationRepository);
    this.factIncreaseUseCase = new GetFactIncreaseStatisticCommonUseCase(trackingOperationRepository);
  }

  async execute(input: GetShortStatisticInput): Promise<GetShortStatisticResponse> {
    const [average, increase] = await Promise.all([
      this.factAverageUseCase.execute(input),
      this.factIncreaseUseCase.execute(input),
    ]);

    return { ...average, ...increase };
  }
}
