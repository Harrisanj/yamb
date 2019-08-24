import { Message } from 'discord.js';

import { Bot } from '../core/BotInterface';
import { ParsedMessage } from '../core/BotCommandParser';

const skip = async (cmd: ParsedMessage, msg: Message, bot: Bot) => {
  bot.player.skip();
};

export default skip;
