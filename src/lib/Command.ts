import { RunParams } from '../types/Command';

class Command {
  constructor(
    public commandName: string,
    public execute: (params: RunParams) => unknown
  ) {}
}

export default Command;
