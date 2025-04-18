const { exitMessage, motivationalMessage } = require('../config/messages.json');

module.exports = async (member) => {
  try {
    const exitText = exitMessage.replace("{user}", member.user.tag);
    await member.send(exitText);

    if (member.roles.cache.has('1354098496067731603')) {
      const motivationalText = motivationalMessage.replace("{user}", member.user.tag);
      await member.send(motivationalText);
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem de saída:', error);
  }
};
