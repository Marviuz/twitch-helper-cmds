import Command from '@/lib/Command';

const mathjs = import('mathjs');

export default new Command(
  'calc',
  async ({ rawArgs, client, channel, tags }) => {
    try {
      client.say(
        channel,
        `@${tags.username} the answer is ${(await mathjs).evaluate(rawArgs)}`
      );
    } catch (error) {
      if (error instanceof Error) {
        client.say(channel, error.message);
        console.log(error);
      } else {
        throw error;
      }
    }
  }
);
