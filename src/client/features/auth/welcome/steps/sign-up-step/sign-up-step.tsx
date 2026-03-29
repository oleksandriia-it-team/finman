'use client';
import './sign-up-step.scss';
import TransactionCard from '../../../../../shared/сomponents/transaction-card/transaction-card';
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
    <div className="relative flex items-center justify-center min-h-screen w-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden p-4">
      <div className="blot bg-blot bg-pink-blot" />
      <div className="blot bg-blot blue-blot" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[30rem] gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
            <div className="relative bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-colors">
              <i className="bi bi-rocket-takeoff text-6xl text-purple-600 dark:text-purple-400 inline-block animate-[bounce_3s_infinite]" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Готові взяти контроль?
            </p>
            <p className="text-slate-600 dark:text-zinc-400 text-lg">Ваша фінансова подорож починається зараз</p>
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
              className="hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-default"
            />
          ))}
        </div>
        <div className="w-full pt-4">
          <Button className="w-full py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30 active:scale-[0.98] transition-all text-white border-0">
            Зареєструватися
          </Button>
          <p className="text-center text-slate-500 dark:text-zinc-500 text-sm mt-4">Це займе менше 1 хвилини</p>
        </div>
      </div>
    </div>
  );
}
