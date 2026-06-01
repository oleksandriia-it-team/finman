const variantToColorVar: Record<string, string> = {
  'warning-muted': 'var(--warning)',
  'destructive-muted': 'var(--destructive-foreground)',
  'aqua-muted': 'var(--aqua-muted-foreground)',
  'primary-muted': 'var(--primary)',
  'pink-muted': 'var(--pink)',
  'purple-muted': 'var(--purple)',
  'teal-muted': 'var(--teal)',
  muted: 'var(--muted-foreground)',
};

export function getVariantColor(variant: string): string {
  return variantToColorVar[variant] ?? 'var(--muted-foreground)';
}
