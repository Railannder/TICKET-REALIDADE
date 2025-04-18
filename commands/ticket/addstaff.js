const { SlashCommandBuilder } = require('discord.js');
const { addStaffToTicket } = require('../../utils/ticketManager.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Comando para gerenciar tickets')
    .addSubcommand(subcommand =>
      subcommand
        .setName('adicionar_staff')
        .setDescription('Adiciona um membro da staff ao ticket')
        .addUserOption(option =>
          option.setName('staff')
            .setDescription('Membro da staff para adicionar')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const staff = interaction.options.getUser('staff');
    await addStaffToTicket(interaction, staff);
    interaction.reply(`Staff ${staff.tag} adicionada ao ticket com sucesso!`);
  }
};
