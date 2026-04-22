interface ShortStatisticBlockProps {
  activePayments: number;
  totalMonthExpenses: number;
  totalMonthIncomes: number;
}

export function ShortStatisticBlock() {
  return (
    <div className="size-full flex flex-row text-primary-foreground">
      <div className="size-full">
        <h3 className="text-lg">
          <b>Швидка статистика</b>
        </h3>
        <p>Активних платежів</p>
      </div>
      <div className="size-full">2nd side</div>
    </div>
  );
}
