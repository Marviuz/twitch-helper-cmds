import { Client as TmiClient } from 'tmi.js';

import * as commandFiles from '@/commands';
import { PREFIX } from '@/constants';
import env from '@/env';

import Command from './Command';

export class Client extends TmiClient {
  commands: Record<string, Command['execute']> = {};

  constructor() {
    super({
      options: { debug: env.NODE_ENV === 'development' },
      identity: {
        username: env.BOT_NAME,
        password: env.BOT_PASS,
      },
      channels: [env.CHANNEL_NAME],
    });
  }

  start() {
    this.registerCommands();
    this.handleCommands();
    this.connect();
  }

  registerCommands() {
    Object.values(commandFiles).forEach(({ commandName, execute }) => {
      Object.assign(this.commands, {
        ...this.commands,
        [commandName]: execute,
      });
    });
  }

  handleCommands() {
    this.on('message', (channel, tags, message, self) => {
      if (self || !message.startsWith(PREFIX)) return;
      const args = message.slice(1).split(' ');
      const commandName = args.shift()?.toLowerCase();

      if (commandName && this.commands[commandName]) {
        this.commands[commandName]({
          client: this,
          commandName,
          args,
          rawArgs: args.join(' '),
          channel,
          tags,
          message,
          self,
        });
      }
    });
  }
}
