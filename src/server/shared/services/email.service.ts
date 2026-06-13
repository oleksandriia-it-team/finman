import { createTransport } from 'nodemailer';
import { EnvConfigConstant } from '@backend/config/env-config.constant';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: EnvConfigConstant.GMAIL_EMAIL,
    pass: EnvConfigConstant.GMAIL_APP_PASSWORD,
  },
});

export function sendEmail(to: string, subject: string, html: string) {
  return transporter.sendMail({ from: '"FinMan" <' + EnvConfigConstant.GMAIL_EMAIL + '>', to, subject, html });
}
