// /commands/admin/config.js
module.exports = {
    data: {
      name: 'config',
      description: 'Configurações administrativas do bot de tickets',
      options: [
        {
          type: 'SUB_COMMAND',
          name: 'listar_tickets',
          description: 'Lista todos os tickets abertos no servidor',
        },
        {
          type: 'SUB_COMMAND',
          name: 'transferir_ticket',
          description: 'Transfere um ticket para outro membro da staff',
          options: [
            {
              name: 'ticket_id',
              description: 'ID do ticket',
              type: 'STRING',
              required: true,
            },
            {
              name: 'staff_member',
              description: 'Membro da staff para transferir o ticket',
              type: 'USER',
              required: true,
            },
          ],
        },
      ],
    },
  
    async execute(interaction) {
      if (!interaction.member.permissions.has('ADMINISTRATOR')) {
        return interaction.reply('Você não tem permissão para usar este comando.');
      }
  
      const subCommand = interaction.options.getSubcommand();
  
      if (subCommand === 'listar_tickets') {
        // Lógica para listar todos os tickets
        await interaction.reply('Aqui está a lista de todos os tickets abertos...');
      }
  
      if (subCommand === 'transferir_ticket') {
        const ticketId = interaction.options.getString('ticket_id');
        const staffMember = interaction.options.getUser('staff_member');
  
        // Lógica para transferir ticket
        await interaction.reply(`Ticket ${ticketId} foi transferido para ${staffMember.tag}`);
      }
    },
  };
  