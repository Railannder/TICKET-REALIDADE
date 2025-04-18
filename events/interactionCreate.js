module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;
  
    const customId = interaction.customId;
  
    if (customId === 'ticket_ajuda') {
      await interaction.reply({ content: 'Ticket de ajuda criado!', ephemeral: true });
    } else if (customId === 'ticket_duvidas') {
      await interaction.reply({ content: 'Ticket de dúvidas criado!', ephemeral: true });
    } else if (customId === 'ticket_atendimento') {
      await interaction.reply({ content: 'Ticket de atendimento criado!', ephemeral: true });
    } else if (customId === 'ticket_vips') {
      await interaction.reply({ content: 'Ticket de Vips criado!', ephemeral: true });
    } else if (customId === 'ticket_assumir') {
      await interaction.reply({ content: 'Ticket de Assumir Facção/Org criado!', ephemeral: true });
    }
  };
  