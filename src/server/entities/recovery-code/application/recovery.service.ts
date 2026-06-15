import { randomInt } from 'node:crypto';

import { sendEmail } from '@backend/shared/services/email.service';
import { resetPasswordHtml } from '@backend/shared/services/template/reset-password.email';

export const RecoveryService = {
  generateCode() {
    return randomInt(100000, 1000000).toString();
  },

  async sendEmail(email: string, code: string) {
    const html = await resetPasswordHtml(code);
    return sendEmail(email, 'Код відновлення паролю', html);
  },
};
