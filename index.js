const { Client } = require("discord.js-selfbot-v11"),
    client = new Client(),
    { token, msg } = require("./config.json");

const delay = ms => new Promise(res => setTimeout(res, ms));

console.log(`\n\n [swg] Conectando...\n\n`);

//

client.on('ready', async() => {
    console.clear()
    console.log(`
 
          Swag

	Conectando da conta: ${client.user.username}
	`);
});

client.on('guildMemberAdd', async(member) => {
  console.log(` [+] ${member.user.tag} entrou no servidor ${member.guild.name}.`);
    member.send(msg).then(() => { 
        console.log(` [!] Mensagem enviada para ${member.user.usernames}`);
        delay(2000000);
    }).catch(() => {
        console.log(` [X] Ops! Ocorreu um erro ao enviar a mensagem para ${member.user.tag}.`) 
    });
});

client.on('message', async(message) => {
  if (message.author.id == client.user.id && message.guild && message.content.startsWith(`oiie`)) {
    console.log(` [+] Pronto, gatilho detectado em: ${message.guild.name}`);
    message.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) {
        member.send(msg).then(() => { 
            console.log(` [+] Mensagem enviada para ${member.user.username}`);
            delay(2000000);
         }).catch(() => {
            console.log(` [x] Erro ao enviar mensagem para ${member.user.tag}, envio pausado por 20 segundos.`);
            delay(2000000);
          });
      }
    });
  }
});

client.on("error", () => {});
client.on("warn", () => {});
client.on("debug", () => {});

client.login(token).catch(() => { console.log(` [x] Token inválido.`) });
