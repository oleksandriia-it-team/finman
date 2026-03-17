'use client';

import GlassCard from '../../../shared/сomponents/glass-card/glass-card';

export default function FirstPage() {
  return (
    <div className="relative flex items-center justify-center p-4 overflow-hidden min-h-[100%]">
      <div className="absolute rounded-full w-[250px] h-[250px] bg-[#20c997]/30 -top-[50px] -right-[50px] blur-[60px] z-0" />
      <div className="absolute rounded-full w-[200px] h-[200px] bg-[#6f42c1]/20 -bottom-[20px] -left-[50px] blur-[80px] z-0" />

      <div className="row items-center justify-between w-full relative z-10 max-w-[1200px] gy-5">
        <div className="col-md-6 text-center text-md-start">
          <h1 className="fw-bold mb-2 text-[2.5rem] md:text-[3.5rem] leading-tight">Керуй своїми фінансами!</h1>
          <h1 className="fw-bold mb-4 text-[2.5rem] md:text-[3.5rem] leading-tight">Легко та стильно</h1>
          <p className="text-body-secondary text-lg md:text-2xl">
            Твій особистий фінансовий простір. Жодних складних таблиць — лише те, що дійсно важливо.
          </p>
        </div>

        <div className="col-md-6 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start">
            <div className="flex items-center sm:mt-12">
              <GlassCard
                icon="💳"
                title="Баланс"
                value={<span className="text-success">+ 12 500 ₴</span>}
                rotationClass="-rotate-3"
                className="shadow-xl"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <GlassCard
                icon="🎯"
                title="На макбук"
                value={<span className="text-info">45% зібрано</span>}
                rotationClass="rotate-2"
              />

              <GlassCard
                icon="☕"
                title="Кав'ярня"
                value={<span className="text-danger">- 85 ₴</span>}
                rotationClass="-rotate-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
