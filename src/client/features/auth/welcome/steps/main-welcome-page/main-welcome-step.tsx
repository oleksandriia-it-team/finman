'use client';

import './main-welcome-step.scss';
import { UiGlassCard } from '@frontend/ui/ui-glass-card/ui-glass-card';

export default function MainWelcomeStep() {
  return (
    <div className="relative z-1 flex items-center justify-center p-4 overflow-hidden min-h-full">
      <div className="blot green-blot" />
      <div className="blot pink-blot" />

      <div className="flex flex-col md:flex-row items-center justify-between w-full relative z-10 max-w-[75rem] gap-y-5">
        <div className="w-full md:w-1/2 text-center text-md-start">
          <h1 className="mb-4 text-4xl md:text-6xl leading-tight">
            <b>
              <span className="block">Керуй своїми фінансами!</span>
              <span className="block">Легко та стильно</span>
            </b>
          </h1>
          <p className="text-secondary-foreground text-lg md:text-2xl">
            Твій особистий фінансовий простір. Жодних складних таблиць — лише те, що дійсно важливо.
          </p>
        </div>

        <div className="w-full md:w-1/2 text flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start">
            <div className="flex items-center sm:mt-12">
              <UiGlassCard
                icon="💳"
                title="Баланс"
                value={<span className="text-success">+ 12 500 ₴</span>}
                rotationClass="-rotate-3"
              />
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <UiGlassCard
                icon="🎯"
                title="На макбук"
                value={<span className="text-secondary-foreground">45% зібрано</span>}
                rotationClass="rotate-2"
              />

              <UiGlassCard
                icon="☕"
                title="Кав'ярня"
                value={<span className="text-destructive">- 85 ₴</span>}
                rotationClass="-rotate-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
