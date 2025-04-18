const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token, guildId, channelId } = require('./config/config.json');
const { sendTicketPanel } = require('./utils/sendTicketPanel');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
  
  // Envia o painel de tickets automaticamente quando o bot é iniciado
  sendTicketPanel(client);
});

client.on('guildMemberAdd', require('./events/guildMemberAdd.js'));
client.on('guildMemberRemove', require('./events/guildMemberRemove.js'));
client.on('messageCreate', require('./events/messageCreate.js'));
client.on('interactionCreate', require('./events/interactionCreate.js'));

client.login(token);
