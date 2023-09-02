// Require the necessary discord.js classes
import { Events, ForumChannel, GatewayIntentBits, Interaction, Partials } from 'discord.js';
import { token } from './config';
import { onReady } from "./src/events/ready";
import { oneHundred } from "./src/commands/testing/onHundred";
import clientManager, { BloDClient } from 'src/utility/blod-client';
import { Manager } from 'socket.io-client';
import { getChannel, getServer, getTitles } from '@/utility/discord';
import { BLoDDiscordSocket } from '@/socket-io';


async function run(){
  // const manager = new Manager("http://localhost:3000", {
  //   reconnectionDelayMax: 10000,
  // });

  // const socket = manager.socket("/polls");

  const client = new BloDClient(
    {
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.User,
        Partials.Reaction,
      ],
    }
    );
  const discordSocket = new BLoDDiscordSocket(client)
  //TODO: 파일 새로 하나 만들어서 넣기 동적으로 이벤트 넣어서 자동으로 등록하기
  //TODO: 자동으로 디스코드 서버와 연결 시키기
  //TODO: 자동으로 디스코드 포럼 채널과 연결 시키기 if channle >= 2 then warn
  // 함수 이름: regitster Scocket Event
    //push: discord -> nestjs
    //pull: nestjs -> discord
    
    // type: string
    // handler: function
  // socket.on("connect", () => {
  //   console.log("connected",socket.id);
  // })


  /////////
  
  client.on("ready", async () => await onReady(client, discordSocket.getSocket()));

  // We use 'c' for the event parameter to keep it separate from the already defined 'client'
  client.on(Events.InteractionCreate, async (interaction: Interaction ) => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = (interaction.client as BloDClient).commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.run(interaction, client);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  })

  // Log in to Discord with your client's token
  // testing for thread update
  client.on(Events.MessageUpdate,async (oldMessage, newMessage) => {
    console.log('thread update')
  })
  client.login(token);
}

run()