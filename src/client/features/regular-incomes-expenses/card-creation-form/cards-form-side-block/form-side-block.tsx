import { UsefulTipsBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block';
import {
  ImageBlock,
  ImageBlockForeground,
} from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/image-block';
import { ShortStatisticBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/short-statistic-block';
import type { UsefulTipsBlockItem } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block-item';

const tips: UsefulTipsBlockItem[] = [
  { icon: 'lightbulb', title: 'Корисні поради' },
  {
    icon: 'calendar-check',
    title: 'Автоматизуйте платежі',
    description: 'Налаштуйте регулярні платежі, щоб не пропускати важливі оплати',
  },
  {
    icon: 'piggy-bank',
    title: 'Контролюйте витрати',
    description: 'Відстежуйте всі регулярні витрати в одному місці для кращого планування',
  },
  {
    icon: 'bar-chart-line',
    title: 'Аналізуйте тренди',
    description: 'Переглядайте статистику доходів та витрат за різні періоди',
  },
];

const imageBlock = {
  image: '/pictures/card-form-image.jpg',
  title: 'Плануйте фінанси розумно',
  subtitle: 'Регулярні платежі допомагають контролювати бюджет',
};

const shortStatistics = {
  activePayments: 12,
  totalMonthIncomes: 28750,
  totalMonthExpenses: 45200,
  balance: 16450,
};

export function CardCreationFormSideBlock() {
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
      <ShortStatisticBlock
        activePayments={shortStatistics.activePayments}
        totalMonthIncomes={shortStatistics.totalMonthIncomes}
        totalMonthExpenses={shortStatistics.totalMonthExpenses}
        balance={shortStatistics.balance}
      />
    </div>
  );
}
