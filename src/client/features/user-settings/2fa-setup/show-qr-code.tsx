import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { UiGraphic } from '@frontend/ui/ui-graphic/ui-graphic';
import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { FinControlledOtp } from '@frontend/components/controlled-fields/fin-controlled-otp';
import type { ShowQrCode2FAProps } from './props/show-qr-code.props';

export function ShowQrCodeTwoFactorSetupQRCode({ data: { qrCodeImage, secret } }: ShowQrCode2FAProps) {
  return (
    <>
      <div className="flex flex-col gap-px">
        <UiTitle>Підключіть автентифікатор</UiTitle>
        <UiDescription>
          Відскануйте QR-код у Google Authenticator, Authy або 1Password і введіть 6-значний код, щоб увімкнути
          двофакторну автентифікацію.
        </UiDescription>
      </div>
      <UiCard position="row">
        <UiGraphic
          src={qrCodeImage}
          width={160}
          height={160}
        />

        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <UiTitle>Або введіть ключ вручну</UiTitle>

            <UiDescription>Якщо не вдається відсканувати — скопіюйте код</UiDescription>
          </div>

          {/*TODO update later*/}
          <UiInput
            type="text"
            readOnly
            value={secret}
          />
        </div>
      </UiCard>

      <FinControlledOtp
        name="code"
        label="Код з додатку"
        description="Введіть 6-значний код, що зараз показує ваш додаток-автентифікатор"
      />
    </>
  );
}
