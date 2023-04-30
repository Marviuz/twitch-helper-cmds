import { ChatUserstate } from 'tmi.js';

import { Client } from '@/lib/Client';

export type RunParams = {
  client: Client;
  commandName: string;
  args: string[];
  rawArgs: string;

  channel: string;
  tags: ChatUserstate;
  message: string;
  self: boolean;
};
