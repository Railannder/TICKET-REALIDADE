const Ticket = require('../models/Ticket');
const { MessageEmbed } = require('discord.js');
const logChannelId = '1358880611007201391';  // Canal de logs (ajustar para o seu ID)

module.exports.createTicketChannel = async (interaction, subject) => {
  const userId = interaction.user.id;

  // Verificando se o usuário já possui um ticket aberto
  const existingTicket = await Ticket.findOne({ where: { userId, status: 'open' } });
  if (existingTicket) {
    return interaction.reply('Você já tem um ticket aberto.');
  }

  // Criando o ticket no banco de dados
  const ticket = await Ticket.create({
    userId: userId,
    subject: subject,
    status: 'open',  // O ticket começa com status 'open'
  });

  // Criando o canal para o ticket
  const channel = await interaction.guild.channels.create(`ticket-${ticket.id}`, {
    type: 'text',
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: ['VIEW_CHANNEL']
      },
      {
        id: userId,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      },
      // Permitindo que o staff tenha acesso ao ticket
      {
        id: interaction.guild.roles.cache.find(role => role.name === 'Staff').id,
        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
      }
    ],
  });

  // Salvando o ID do canal no ticket
  ticket.channelId = channel.id;
  await ticket.save();

  // Enviar mensagem de boas-vindas no canal
  const welcomeEmbed = new MessageEmbed()
    .setTitle('📩 Novo Ticket')
    .setDescription(`Olá <@${userId}>, seu ticket foi criado com sucesso! Um membro da nossa equipe irá te atender em breve.\n**Assunto:** ${subject}`)
    .setColor('BLUE')
    .setTimestamp();
  
  channel.send({ embeds: [welcomeEmbed] });

  // Enviar DM para o usuário informando que o ticket foi criado
  try {
    await interaction.user.send({
      content: `✅ Seu ticket foi criado no servidor **${interaction.guild.name}** com o assunto: **${subject}**. Acesse o canal do ticket para interagir com a equipe.`
    });
  } catch (error) {
    console.error(`Não foi possível enviar DM para o usuário ${interaction.user.tag}`);
  }

  // Log da criação do ticket
  const logChannel = interaction.guild.channels.cache.get(logChannelId);
  if (logChannel) {
    const logEmbed = new MessageEmbed()
      .setTitle('🎟️ Ticket Criado')
      .setDescription(`**Usuário:** <@${userId}>\n**Assunto:** ${subject}\n**Canal:** ${channel}`)
      .setColor('GREEN')
      .setTimestamp();
    logChannel.send({ embeds: [logEmbed] });
  }
};

module.exports.closeTicketChannel = async (interaction, reason) => {
  const ticketId = interaction.channel.name.split('-')[1];
  const ticket = await Ticket.findByPk(ticketId);

  if (!ticket) {
    return interaction.reply('Ticket não encontrado.');
  }

  // Verificando se o usuário que está fechando o ticket é o staff responsável
  if (!interaction.member.roles.cache.some(role => role.name === 'Staff')) {
    return interaction.reply('Você não tem permissão para fechar este ticket.');
  }

  // Marcando o ticket como fechado
  ticket.status = 'closed';
  ticket.closeReason = reason; // Salvando o motivo de fechamento
  await ticket.save();

  // Enviando mensagem no canal do ticket informando sobre o fechamento
  interaction.reply(`Ticket fechado com sucesso! Motivo: ${reason}`);

  // Log do fechamento
  const logChannel = interaction.guild.channels.cache.get(logChannelId);
  if (logChannel) {
    const logEmbed = new MessageEmbed()
      .setTitle('📁 Ticket Fechado')
      .setDescription(`**Ticket ID:** ${ticket.id}\n**Usuário:** <@${ticket.userId}>\n**Motivo de fechamento:** ${reason}`)
      .setColor('RED')
      .setTimestamp();
    logChannel.send({ embeds: [logEmbed] });
  }

  // Deletando o canal após 5 segundos
  setTimeout(() => {
    interaction.channel.delete().catch(console.error);
  }, 5000);
};

module.exports.assignStaffToTicket = async (interaction, staffId) => {
  const ticketId = interaction.channel.name.split('-')[1];
  const ticket = await Ticket.findByPk(ticketId);

  if (!ticket) {
    return interaction.reply('Ticket não encontrado.');
  }

  // Adicionando o staff ao ticket
  const staffRole = interaction.guild.roles.cache.find(role => role.id === staffId);
  if (!staffRole) {
    return interaction.reply('Cargo de staff não encontrado.');
  }

  // Salvando staff atribuído ao ticket
  ticket.staffId = staffId;
  await ticket.save();

  // Enviando mensagem informando que o staff foi atribuído ao ticket
  interaction.reply(`O staff <@${staffId}> foi atribuído ao ticket com sucesso.`);

  // Log da atribuição
  const logChannel = interaction.guild.channels.cache.get(logChannelId);
  if (logChannel) {
    const logEmbed = new MessageEmbed()
      .setTitle('🔧 Staff Atribuído')
      .setDescription(`**Ticket ID:** ${ticket.id}\n**Usuário:** <@${ticket.userId}>\n**Staff Atribuído:** <@${staffId}>`)
      .setColor('YELLOW')
      .setTimestamp();
    logChannel.send({ embeds: [logEmbed] });
  }
};

