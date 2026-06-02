import type { PieLabelRenderProps } from 'recharts';

const MinPercentToShowLabel = 0.05;
const InnerLabelRadiusRatio = 0.5;
const RadianFactor = Math.PI / 180;

export function renderPieLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

  if (
    typeof cx !== 'number' ||
    typeof cy !== 'number' ||
    typeof midAngle !== 'number' ||
    typeof innerRadius !== 'number' ||
    typeof outerRadius !== 'number' ||
    typeof percent !== 'number' ||
    percent < MinPercentToShowLabel
  ) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * InnerLabelRadiusRatio;
  const x = cx + radius * Math.cos(-midAngle * RadianFactor);
  const y = cy + radius * Math.sin(-midAngle * RadianFactor);

  const rounded = Math.round(percent * 100);
  const display = percent < 1 ? Math.min(rounded, 99) : 100;

  return (
    <text
      x={x}
      y={y}
      fill="var(--background)"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${display}%`}
    </text>
  );
}
