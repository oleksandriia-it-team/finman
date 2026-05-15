import { MonthTitles } from '@common/constants/month-titles.constant';
import { UiSvgIcon } from '@frontend/shared/ui/ui-svg-icon/ui-svg-icon';
import type { Month } from '@common/enums/month.enum';

interface CurrentPlanHeaderProps {
  month: Month;
  year: number;
}

export function CurrentPlanHeader({ month, year }: Readonly<CurrentPlanHeaderProps>) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        <div className="flex items-center gap-2 text-">
          <UiSvgIcon
            name="calendar"
            size="sm"
          />
          <span className="text-base">Поточний план</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-foreground">
          {MonthTitles[month]} {year}
        </h1>
      </div>

      <div className="hidden md:block">
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <UiSvgIcon
            name="calendar"
            size="sm"
          />
          <span className="text-sm">Поточний план</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          {MonthTitles[month]} {year}
        </h1>
      </div>
    </>
  );
}
