const { SlashCommandBuilder } = require('discord.js');
const { createTicketChannel } = require('../../utils/ticketManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Comando para gerenciar tickets')
    .addSubcommand(subcommand =>
      subcommand
        .setName('criar')
        .setDescription('Cria um novo ticket')
        .addStringOption(option =>
          option.setName('assunto')
            .setDescription('Assunto do ticket')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'criar') {
      const subject = interaction.options.getString('assunto');
      await createTicketChannel(interaction, subject);
      interaction.reply(`Ticket criado com sucesso! Assunto: ${subject}`);
    }
  }
};
