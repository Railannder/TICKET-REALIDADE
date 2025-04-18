const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports.sendTicketPanel = async (client) => {
  const guild = client.guilds.cache.get('YOUR_GUILD_ID');
  if (!guild) return console.error('Guild não encontrada.');

  const channel = guild.channels.cache.get('YOUR_CHANNEL_ID'); 
  if (!channel) return console.error('Canal não encontrado.');

  const embed = new EmbedBuilder()
    .setTitle('Painel de Tickets')
    .setDescription('Escolha uma das opções abaixo para criar seu ticket:')
    .setColor('#0099ff');

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('ticket_ajuda').setLabel('Ajuda').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ticket_duvidas').setLabel('Dúvidas').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ticket_atendimento').setLabel('Atendimento').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ticket_vips').setLabel('Vips').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('ticket_assumir').setLabel('Assumir Facção/Org').setStyle(ButtonStyle.Primary)
  );

  try {
    await channel.send({ embeds: [embed], components: [row] });
    console.log('Painel de tickets enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar painel de tickets:', error);
  }
};
