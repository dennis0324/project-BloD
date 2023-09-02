// Require the necessary discord.js classes
import { Events, ForumChannel, GatewayIntentBits, Interaction, Partials } from 'discord.js';
import { token } from './config';
import { onReady } from "./src/events/ready";
import { oneHundred } from "./src/commands/testing/onHundred";
import clientManager, { BloDClient } from 'src/utility/blod-client';
import { Manager } from 'socket.io-client';
import { getChannel, getServer, getTitles } from '@/utility/discord';


async function run(){
  const manager = new Manager("http://localhost:3000", {
    reconnectionDelayMax: 10000,
  });

  const socket = manager.socket("/polls");

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
  //TODO: 파일 새로 하나 만들어서 넣기 동적으로 이벤트 넣어서 자동으로 등록하기
  //TODO: 자동으로 디스코드 서버와 연결 시키기
  //TODO: 자동으로 디스코드 포럼 채널과 연결 시키기 if channle >= 2 then warn
  // 함수 이름: regitster Scocket Event
    //push: discord -> nestjs
    //pull: nestjs -> discord
  socket.on("connect", () => {
    console.log("connected",socket.id);
  })

  socket.on('blog:getPost',async (data) => {
    console.log(data.serverID)
    socket.emit('blog:getPost',client.guilds.cache.get(data.serverID).id)
  })

  socket.on('blog:nd:title',async (data) => {
    console.log('discord getting title',data.serverID)
    const guild = getServer(client,data.serverID)

    //TODO: 이거 literal 형식이 아니라 variable 형식으로 변경해야됨
    const channel = getChannel(guild,'1088461106701422735')
    const threads = await getTitles(channel as ForumChannel)
    const threadsName = threads.threads.map(thread => thread.name)
    socket.emit('blog:dn:title',threadsName)
  })
  /////////
  
  client.on("ready", async () => await onReady(client, socket));

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