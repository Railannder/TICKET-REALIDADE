# 🤖 BOT DE TICKET - REALIDADE RJ

Um bot de ticket profissional e completo para servidores de GTA RP no Discord. Ele oferece sistema de criação e fechamento de tickets com painel interativo, logs, transcrição automática, permissões avançadas, DM de boas-vindas e saída, avaliação de atendimento, integração com MySQL (HeidiSQL) e muito mais.

---

## ⚙️ Funcionalidades

- Painel de criação com botões:
  - 🎟️ Ajuda
  - ❓ Dúvidas
  - 🛠️ Atendimento
  - 💎 VIPs
  - 🏴 Assumir Facção ou Organização
- Restrição de acesso ao ticket (somente staff responsável)
- Sistema de avaliação ao finalizar atendimento
- Transcrição automática antes de deletar ticket
- Mensagens agradáveis e personalizadas com imagem/GIF
- Sistema de prioridade para tickets
- Fechamento automático após 15 minutos de inatividade
- Envio automático do painel ao iniciar o bot
- Logs em canal específico
- Mensagens de boas-vindas com cargo automático
- Mensagens de saída por DM (motivacional para verificados)
- Totalmente personalizável via arquivos `.json`

---

## 🧬 Estrutura de Pastas

ticket-bot/
├── config/
│   ├── config.json
│   └── messages.json
├── commands/
│   ├── ticket/
│   │   ├── close.js
│   │   ├── create.js
│   │   └── addstaff.js
│   └── admin/
│       ├── setup.js
│       └── config.js
├── events/
│   ├── messageCreate.js
│   ├── interactionCreate.js
│   ├── guildMemberAdd.js
│   └── guildMemberRemove.js
├── models/
│   ├── Ticket.js
│   └── Staff.js
├── utils/
│   ├── ticketManager.js
│   ├── sendTicketPanel.js
│   └── permissions.js
├── index.js
└── package.json

Entre na pasta:
cd TICKET-REALIDADE

Instale as dependências:

npm install

Configure o arquivo .env com seu token e banco de dados:

DISCORD_TOKEN=seu_token_aqui
CLIENT_ID=seu_id_do_bot
GUILD_ID=seu_id_do_servidor
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=tickets

Inicie o bot:

Editar
node index.js


🧩 Requisitos
Node.js (v16 ou superior)

MySQL ou MariaDB (para integração com HeidiSQL)

Discord.js v14

Permissões no bot para:

Gerenciar Canais

Enviar Mensagens

Gerenciar Mensagens

Usar Comandos de Aplicativo

🛠️ Cargos e IDs Utilizados

Nome do Cargo	ID
Cidadão Comum	
Cidadão Verificado	
Cargo da Staff	
Canal de Logs	
Canal do Painel	
Categoria dos Tickets	


💡 Créditos
Desenvolvido por [Railannder]
Ideal para servidores de RP que buscam um atendimento mais profissional, organizado e automatizado.

🧃 Dúvidas?
Abra um ticket! 😄
https://discord.gg/WUTNGCgRjs
