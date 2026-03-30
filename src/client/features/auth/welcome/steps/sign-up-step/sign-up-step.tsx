'use client';
import './sign-up-step.scss';
import TransactionCard from '../../../../../entities/budget-plan/transaction-card/transaction-card';
import Button from '../../../../../shared/сomponents/button/button';

export default function SignUpStep() {
  const checks = [
    {
      id: 1,
      icon: <i className="bi bi-shield-check text-xl" />,
      title: 'Повний контроль коштів',
      subtitle: 'Ваші гроші під контролем',
      type: 'income' as const,
    },
    {
      id: 2,
      icon: <i className="bi bi-graph-up-arrow text-xl" />,
      title: 'Аналітика витрат',
      subtitle: 'Детальні графіки та звіти',
      type: 'income' as const,
    },
  ];

  return (
    <div className=" step-background relative flex items-center justify-center min-h-screen w-full overflow-hidden p-4">
      <div className="blot bg-blot bg-pink-blot" />
      <div className="blot bg-blot blue-blot" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[30rem] gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="icon-glow-layer" />
            <div className="icon-card-wrapper relative p-6 flex items-center justify-center">
              <i className="bi bi-rocket-takeoff text-6xl rocket-icon" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-3xl md:text-4xl font-bold step-title tracking-tight leading-tight">
              Готові взяти контроль?
            </p>
            <p className="text-lg step-subtitle">Ваша фінансова подорож починається зараз</p>
          </div>
        </div>
        <div className="w-full space-y-3">
          {checks.map((check) => (
            <TransactionCard
              key={check.id}
              icon={check.icon}
              title={check.title}
              subtitle={check.subtitle}
              type={check.type}
              amount="✓"
              className="step-card-item"
            />
          ))}
        </div>
        <div className="w-full pt-4">
          <Button className="step-submit-btn w-full py-6 text-lg font-semibold border-0">Зареєструватися</Button>
          <p className="text-center step-footer-text text-sm mt-4">Це займе менше 1 хвилини</p>
        </div>
      </div>
    </div>
  );
}
