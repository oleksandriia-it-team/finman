import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';

const variantToColorVar: Partial<Record<ColorVariantModel, string>> = {
  'warning-muted': 'var(--warning)',
  'destructive-muted': 'var(--destructive-foreground)',
  'aqua-muted': 'var(--aqua-muted-foreground)',
  'primary-muted': 'var(--primary)',
  'pink-muted': 'var(--pink)',
  'purple-muted': 'var(--purple)',
  'teal-muted': 'var(--teal)',
  muted: 'var(--muted-foreground)',
};

export function getVariantColor(variant: ColorVariantModel): string {
  return variantToColorVar[variant] ?? 'var(--muted-foreground)';
}
