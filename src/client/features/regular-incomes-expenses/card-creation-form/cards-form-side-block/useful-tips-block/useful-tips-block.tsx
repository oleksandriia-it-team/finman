import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import type { UsefulTipsBlockProps } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block-props';

export function UsefulTipsBlock({ items }: UsefulTipsBlockProps) {
  return (
    <div className=" size-full bg-card rounded-b-2xl flex flex-col justify-center gap-4 p-10">
      {items.map((item, i) => {
        return (
          <UiInfoBlock
            className="gap-3"
            key={i}
            title={item.title}
            description={item.description ?? null}
            name={item.icon}
          />
        );
      })}
    </div>
  );
}
