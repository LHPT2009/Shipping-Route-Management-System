import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer.service';
import { EmailService } from './email/email.service';
import * as fs from 'fs';
import * as path from 'path';

type EmailItem = {
  title: string;
  content: string;
  button: string;
  verifyToken: string;
  email: string;
  username: string;
  url: string;
  typemail: string;
};

@Injectable()
export class SendMailConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly emailService: EmailService,
  ) { }

  email_template(title: string, content: string, button: string, url: string, username: string, typemail: string): string {
    const templatePath = path.resolve(process.cwd(), typemail === "confirm" ? 'apps/notification/src/email/email_template.html' : 'apps/notification/src/email/email_template_contact.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{url}}', url)
      .replace('{{username}}', username)
      .replace('{{contact}}', process.env.CUSTOMER_CONTACT_URL)
      .replace('{{title}}', title)
      .replace('{{content}}', content)
      .replace('{{button}}', button);

    return htmlContent;
  }

  sendMail(title: string, content: string, button: string, verifyToken: string, email: string, username: string, url: string, typemail: string) {
    try {
      const emailHtml = this.email_template(title, content, button, url, username, typemail);
      this.emailService.sendEmail(
        email,
        typemail === "confirm" ? 'Verify a new account' : 'Information Reception System',
        emailHtml
      );
    } catch (error) {
      console.error(error);
    }
  }

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'send-mail' },
      {
        eachMessage: async ({ message }) => {
          const info: EmailItem = JSON.parse(message.value.toString());
          this.sendMail(info.title, info.content, info.button, info.verifyToken, info.email, info.username, info.url, info.typemail)
        }
      }
    );
  }
}