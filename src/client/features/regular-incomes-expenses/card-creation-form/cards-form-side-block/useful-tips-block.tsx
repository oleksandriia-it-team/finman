import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';

interface UsefulTipsBlockItem {
  icon: string;
  title: string;
  description?: string;
}

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

export function UsefulTipsBlock() {
  return (
    <div className=" size-full bg-card rounded-b-2xl flex flex-col justify-center gap-4 p-10">
      {tips.map((item, i) => {
        return (
          <UiInfoBlock
            className="gap-3"
            key={i}
            size="lg"
            title={item.title}
            description={item.description ?? null}
            name={item.icon}
          />
        );
      })}
    </div>
  );
}
