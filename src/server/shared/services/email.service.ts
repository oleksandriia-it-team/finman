import { createTransport } from 'nodemailer';
import { EnvConfigConstant } from '@backend/config/env-config.constant';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: EnvConfigConstant.GMAIL_EMAIL,
    pass: EnvConfigConstant.GMAIL_APP_PASSWORD,
  },
  family: 4,
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
} as SMTPTransport.Options);

export function sendEmail(to: string, subject: string, html: string) {
  return transporter.sendMail({ from: '"FinMan" <' + EnvConfigConstant.GMAIL_EMAIL + '>', to, subject, html });
}
