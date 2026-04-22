import { UsefulTipsBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block';
import { ImageBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/image-block';
import { ShortStatisticBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/short-statistic-block';

export function CardCreationFormSideBlock() {
  return (
    <div className="bg-primary size-full flex flex-col items-center justify-center">
      <ImageBlock />
      <UsefulTipsBlock />
      <ShortStatisticBlock />
    </div>
  );
}
