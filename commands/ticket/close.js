const { SlashCommandBuilder } = require('discord.js');
const { closeTicketChannel } = require('../../utils/ticketManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Comando para gerenciar tickets')
    .addSubcommand(subcommand =>
      subcommand
        .setName('fechar')
        .setDescription('Fecha o ticket')
        .addStringOption(option =>
          option.setName('motivo')
            .setDescription('Motivo do fechamento')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'fechar') {
      const reason = interaction.options.getString('motivo');
      await closeTicketChannel(interaction, reason);
      interaction.reply(`Ticket fechado com sucesso! Motivo: ${reason}`);
    }
  }
};
