import type { TwoFASetupResponse } from '@common/domains/totp/totp-setup-response.model';

export interface ShowQrCode2FAProps {
  data: TwoFASetupResponse;
}
