import { getConfigService } from '@config/app.config';
import { createTransport, SendMailOptions } from 'nodemailer';

export const mail = async (mailOptions: SendMailOptions) => {
  const transporter = createTransport({
    service: getConfigService().get<string>('sendEmail.service'),
    port: getConfigService().get<string>('sendEmail.port'),
    secure: true,
    auth: {
      user: getConfigService().get<string>('sendEmail.email'),
      pass: getConfigService().get<string>('sendEmail.password'),
    },
  });
  const info = await transporter.sendMail({
    from: `"Mental Health Application" <${getConfigService().get<string>('sendEmail.email')}>`,
    ...mailOptions,
  });
  console.log('Message sent:', info.messageId);
};
