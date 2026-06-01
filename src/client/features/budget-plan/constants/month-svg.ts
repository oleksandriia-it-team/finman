import type { ReactNode, SVGProps } from 'react';
import { Month } from '@common/enums/month.enum';
import { JanuarySvg } from '../icons/january-svg';
import { FebruarySvg } from '../icons/february-svg';
import { MaySvg } from '../icons/may-svg';
import { AprilSvg } from '../icons/april-svg';
import { MarchSvg } from '../icons/march-svg';
import { JuneSvg } from '../icons/june-svg';
import { JulySvg } from '../icons/july-svg';
import { AugustSvg } from '../icons/august-svg';
import { SeptemberSvg } from '../icons/september-svg';
import { OctoberSvg } from '../icons/october-svg';
import { NovemberSvg } from '../icons/november-svg';
import { DecemberSvg } from '../icons/december-svg';

export const MonthSvg: Record<Month, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  [Month.January]: JanuarySvg,
  [Month.February]: FebruarySvg,
  [Month.March]: MarchSvg,
  [Month.April]: AprilSvg,
  [Month.May]: MaySvg,
  [Month.June]: JuneSvg,
  [Month.July]: JulySvg,
  [Month.August]: AugustSvg,
  [Month.September]: SeptemberSvg,
  [Month.October]: OctoberSvg,
  [Month.November]: NovemberSvg,
  [Month.December]: DecemberSvg,
};
