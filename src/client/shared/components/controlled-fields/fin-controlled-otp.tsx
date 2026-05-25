import { Controller, useFormContext } from 'react-hook-form';
import type { FinControlledOtpProps } from '@frontend/components/controlled-fields/props/controlled-otp.props';
import { UiInputOTP, UiInputOTPGroup, UiInputOTPSeparator, UiInputOTPSlot } from '@frontend/ui/ui-otp-input/input-otp';
import { cn } from '@frontend/shared/utils/cn.util';
import { useState } from 'react';

export const FinControlledOtp = ({ name, label, description, className }: FinControlledOtpProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [dividerRef, setDividerRef] = useState<HTMLDivElement | null>(null);

  const slotWidth = ((ref?.clientWidth ?? 0) - (dividerRef?.clientWidth ?? 0)) / 6;

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      {label && <label className="text-sm font-semibold text-foreground ml-0.5">{label}</label>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <UiInputOTP
            className="text-lg"
            maxLength={6}
            value={field.value}
            onChange={field.onChange}
            disabled={field.disabled}
            aria-invalid={!!error}
            ref={setRef}
          >
            <UiInputOTPGroup className="w-full gap-0 justify-center">
              <UiInputOTPSlot
                isFirstInGroup
                style={{
                  width: `${slotWidth}px`,
                }}
                className="h-12"
                index={0}
              />
              <UiInputOTPSlot
                style={{
                  width: `${slotWidth}px`,
                }}
                className="h-12"
                index={1}
              />
              <UiInputOTPSlot
                style={{
                  width: `${slotWidth}px`,
                }}
                className="h-12"
                index={2}
                isLastInGroup
              />
              <UiInputOTPSeparator
                ref={setDividerRef}
                className="mx-1"
              />
              <UiInputOTPSlot
                isFirstInGroup
                style={{
                  width: `${slotWidth}px`,
                }}
                className="h-12"
                index={3}
              />
              <UiInputOTPSlot
                style={{
                  width: `${slotWidth}px`,
                }}
                className="h-12"
                index={4}
              />
              <UiInputOTPSlot
                style={{
                  width: `${slotWidth}px`,
                }}
                className="h-12"
                index={5}
                isLastInGroup
              />
            </UiInputOTPGroup>
          </UiInputOTP>
        )}
      />
      <div className="min-h-[1.25rem] ml-0.5">
        {error ? (
          <span className="text-sm text-destructive-foreground font-medium">{error.message as string}</span>
        ) : (
          description && <span className="text-sm text-muted-foreground flex items-center gap-1.5">{description}</span>
        )}
      </div>
    </div>
  );
};
