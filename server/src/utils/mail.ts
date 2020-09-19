import nodemailer from 'nodemailer';

export const sendMail = async (
  address: string,
  subject: string,
  message: string
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: (process.env.MAIL_PORT as unknown) as number,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  if (process.env.JEST_WORKER_ID) {
    return;
  }

  await new Promise((resolve: any) => {
    transporter
      .sendMail({
        from: `BestCook ${process.env.MAIL_USER}`,
        to: address,
        subject,
        text: message
      })
      .finally(resolve);
  });
};
