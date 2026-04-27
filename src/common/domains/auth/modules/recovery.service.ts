import { Resend } from 'resend';
import { randomInt } from 'node:crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export const RecoveryService = {
  generateCode() {
    return randomInt(100000, 1000000).toString();
  },

  async sendEmail(email: string, code: string) {
    return await resend.emails.send({
      from: 'Finman Auth <onboarding@resend.dev>',
      to: [email],
      subject: 'Код відновлення паролю',
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h1>Відновлення доступу</h1>
          <p>Ваш код підтвердження (діє 5 хвилин):</p>
          <div style="font-size: 32px; font-weight: bold; color: #0265fd; letter-spacing: 4px;">
            ${code}
          </div>
        </div>
      `,
    });
  },
};
