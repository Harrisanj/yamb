const stop = async (message, args) => {
  if (!message.member.voiceChannel) return;

  message.member.voiceChannel.leave();

  await message.channel.send('Player stopped.');
};

module.exports = stop;
