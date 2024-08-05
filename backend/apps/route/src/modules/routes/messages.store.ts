import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageStore {
  private messages: { [key: string]: any[] } = {};

  saveMessage(topic: string, message: any) {
    if (!this.messages[topic]) {
      this.messages[topic] = [];
    }
    console.log(message);
    this.messages[topic].push(message);
  }

  getMessages(topic: string): any[] {
    return this.messages[topic] || [];
  }
}
