import * as nodemailer from 'nodemailer';

export function send(params: {to: string, subject: string, text: string}) {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // TODO set in config
    port: 587,
    auth: {
      user: 'locnguyentestmail@gmail.com', // TODO set in config
      pass: '12345aA@' // TODO set in config
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const message = {
    from: '"Loc Nguyen" locnguyentestmail@gmail.com', // TODO set in config
    to: params.to,
    subject: params.subject,
    text: params.text
  };

  return transport.sendMail(message);
}