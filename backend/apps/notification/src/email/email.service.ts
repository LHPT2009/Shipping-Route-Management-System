import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  constructor() { };
  mailTransport(): any {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    return transporter;
  }

  async sendEmail(to, subject, htmlContent) {
    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: `"S-Routing" ${process.env.MAIL_FROM_ADDRESS}`,
      to: to,
      subject: subject,
      html: htmlContent
    }

    try {
      await transport.sendMail(options);
    } catch (error) {

    }

  }
}
