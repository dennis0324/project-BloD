// Require the necessary discord.js classes
import { ChannelType, Events, ForumChannel, GatewayIntentBits, Interaction, Partials } from 'discord.js';
import { token } from './config';
import { onReady } from "./src/events/ready";
import { oneHundred } from "./src/commands/testing/onHundred";
import clientManager, { BloDClient } from 'src/utility/blod-client';
import { Manager } from 'socket.io-client';
import { BLoDDiscordSocket } from '@/socket-io';


async function run(){

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

  discordSocket.ready().then(() => {
    const channelsData:Record<string,string> = {}
    console.log('ready to send')

    const guildCache = discordSocket.getClient().guilds.cache
    if(guildCache.size > 1) console.warn('discord server is more than 1');
    const guild = guildCache.first()
    const channels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum)
    channels.forEach((channel,channelTitle) => {
      const serverID = channelTitle
      const title = channel.name

      channelsData[title] = serverID
    })
    discordSocket.getSocket().emit("discord:ready",{id:guild.id,routes:channelsData})
  })


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
  
  client.on("ready", async () => await onReady(discordSocket));

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