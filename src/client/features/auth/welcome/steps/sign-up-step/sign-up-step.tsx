'use client';

import TransactionCard from '../../../../../shared/сomponents/transaction-card/transaction-card';
import Button from '../../../../../shared/сomponents/button/button';

export default function SignUpStep() {
  const checks = [
    { id: 1, icon: '✔', title: 'Контроль коштів' },
    { id: 2, icon: '✔', title: 'Аналітика витрат та надходжень' },
  ];

  return (
    <div className="flex items-center justify-center size-full bg-linear-to-br">
      <div className="absolute w-144 h-144 bg-purple-600/50 rounded-full blur-[80px] top-10 left-[15%] z-0" />
      <div className="absolute w-144 h-144 bg-blue-600/50 rounded-full blur-[80px] bottom-10 right-[15%] z-0" />

      <div className=" p-4 gap-4 transition-all duration-[400ms] shadow-md hover:shadow-2xl hover:scale-105 justify-center relative flex items-center flex-col w-[90%] min-h-screen max-h-fit max-w-fit backdrop-blur-md bg-white/5 border rounded-3xl border-gray-200">
        <div className=" bg-transparent text-7xl w-max h-max animate-bounce drop-shadow-[10px_20px_20px_#be38f3]">
          <i className="bi bi-rocket-takeoff" />
        </div>
        <p className="text-center text-body text-4xl">ГОТОВІ ВЗЯТИ КОНТРОЛЬ НАД ВЛАСНИМИ ФІНАНСАМИ? </p>
        <p className="text-center text-secondary text-xl">ВАША ФІНАНСОВА ПОДОРОЖ ПОЧИНАЄТЬСЯ ЗАРАЗ </p>

        <div className="p-4 !bg-white/10 rounded-4 shadow-sm border border-subtle">
          {checks.map((tx) => (
            <TransactionCard
              key={tx.id}
              icon={tx.icon}
              title={tx.title}
              className="transition-all duration-[300ms] shadow-md hover:shadow-2xl hover:scale-105 !bg-white/5"
            />
          ))}
        </div>
        <Button
          className="bg-gradient-to-r p-4 w-[90%] h-auto from-purple-500 to-blue-500"
          variant="info"
        >
          <span className="text-body">Зареєструватися</span>
        </Button>
      </div>
    </div>
  );
}
