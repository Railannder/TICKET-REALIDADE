const { welcomeMessage } = require('../config/messages.json');

module.exports = async (member) => {
  try {
    await member.roles.add('1354098496050827350');
    const personalizedMessage = welcomeMessage.replace("{user}", member.user.tag);
    await member.send(personalizedMessage);
  } catch (error) {
    console.error('Erro ao dar boas-vindas:', error);
  }
};
