interface TransactionDateSeparatorProps {
  date: string;
}

export function UiDateSeparator({ date }: TransactionDateSeparatorProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-border" />
      <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">{date}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
