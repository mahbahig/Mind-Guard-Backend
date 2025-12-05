import { EventEmitter } from 'node:events';
import { mail } from './send-email';
import { confirmEmailTemplate } from './templates';

export const sendEmail = new EventEmitter();

sendEmail.on('confirmEmail', async ({ to, otp }: { to: string; otp: string }) => {
  await mail({ subject: 'Confirm Email', to, html: confirmEmailTemplate(otp) });
});
