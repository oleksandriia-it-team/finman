const MinPercentToShowLabel = 0.05;
const InnerLabelRadiusRatio = 0.5;
const RadianFactor = Math.PI / 180;

export function RenderPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: never) {
  if (!percent || percent < MinPercentToShowLabel) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * InnerLabelRadiusRatio;
  const x = cx + radius * Math.cos(-midAngle * RadianFactor);
  const y = cy + radius * Math.sin(-midAngle * RadianFactor);

  return (
    <text
      x={x}
      y={y}
      fill="var(--background)"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
}
