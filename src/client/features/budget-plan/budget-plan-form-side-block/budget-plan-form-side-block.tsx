import { UsefulTipsBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block';
import {
  ImageBlock,
  ImageBlockForeground,
} from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/image-block';
import type { UsefulTipsBlockItem } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block-item';

const tips: UsefulTipsBlockItem[] = [
  { icon: 'lightbulb', title: 'Корисні поради' },
  {
    icon: 'target',
    title: 'Плануйте бюджет',
    description: 'Встановіть бюджет для кожної категорії й слідкуйте за видатками',
  },
  {
    icon: 'piggy-bank',
    title: 'Контролюйте видатки',
    description: 'Відстежуйте, як ви витрачаєте гроші кожного місяця',
  },
  {
    icon: 'bar-chart-line',
    title: 'Аналізуйте видатки',
    description: 'Переглядайте рекомендації для оптимізації ваших витрат',
  },
];

const imageBlock = {
  image: '/pictures/card-form-image.jpg',
  title: 'План на місяць',
  subtitle: 'Складіть реалістичний бюджет й досягніть своїх фінансових цілей',
};

export function BudgetPlanFormSideBlock() {
  return (
    <div className="bg-primary size-full flex flex-col items-center justify-center">
      <ImageBlock image={imageBlock.image}>
        <ImageBlockForeground
          title={imageBlock.title}
          subtitle={imageBlock.subtitle}
          blurred
        />
      </ImageBlock>
      <UsefulTipsBlock items={tips} />
    </div>
  );
}
