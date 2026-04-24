'use client';
import { TransactionCard } from '@frontend/entities/budget-plan/transaction-card/transaction-card';
import Link from 'next/link';

import './sign-up-step.scss';
import { UiPurpleButton } from '@frontend/ui/ui-purple-button/ui-purple-button';
import { TypeEntry } from '@common/enums/entry.enum';

export default function SignUpStep() {
  const checks = [
    {
      id: 1,
      icon: 'shield-check',
      title: 'Повний контроль коштів',
      description: 'Ваші гроші під контролем',
      type: TypeEntry.Income,
    },
    {
      id: 2,
      icon: 'graph-up-arrow',
      title: 'Аналітика витрат',
      description: 'Детальні графіки та звіти',
      type: TypeEntry.Income,
    },
  ];

  return (
    <div className=" step-background relative flex items-center justify-center min-h-screen w-full overflow-hidden p-4">
      <div className="blot bg-blot bg-pink-blot " />
      <div className="blot bg-blot blue-blot " />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[30rem] gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="icon-glow-layer" />
            <div className="icon-card-wrapper relative p-6 flex items-center justify-center">
              <i
                className="bi bi-rocket-takeoff text-6xl rocket-icon "
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-3xl md:text-4xl font-bold step-title tracking-tight leading-tight">
              Готові взяти контроль?
            </p>
            <p className="text-lg text-muted-foreground">Ваша фінансова подорож починається зараз</p>
          </div>
        </div>
        <div className="w-full space-y-3">
          {checks.map((check) => (
            <TransactionCard
              bgNone
              key={check.id}
              name={check.icon}
              title={check.title}
              description={check.description}
              type={check.type as TypeEntry.Income | TypeEntry.Expense}
              check="✓"
              className="step-card-item"
            />
          ))}
        </div>
        <div className="w-full pt-4">
          <UiPurpleButton
            asChild
            isOutlined
            bgNone
            isRoundedFull
            size="lg"
            className="w-full py-6"
          >
            <Link
              className="!text-inherit !no-underline"
              href="/signup"
            >
              Зареєструватися
            </Link>
          </UiPurpleButton>
          <p className="text-center text-muted-foreground text-sm mt-4">Це займе менше 1 хвилини</p>
        </div>
      </div>
    </div>
  );
}
