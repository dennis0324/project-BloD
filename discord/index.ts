// Require the necessary discord.js classes
import { Events, GatewayIntentBits, Interaction, Partials } from 'discord.js';
import { token } from './config';
import { onReady } from "./src/events/ready";
import { oneHundred } from "./src/commands/testing/onHundred";
import clientManager, { BloDClient } from 'src/utility/blod-client';
import { Manager } from 'socket.io-client';


async function run(){
  const manager = new Manager("http://localhost:3000", {
    reconnectionDelayMax: 10000,
  });

  const socket = manager.socket("/");


  
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

  socket.on("connect", () => {
    console.log("connected");

    socket.on('getBlogPost',async (data) => {
      console.log(data.serverID)
      socket.emit('getBlogPost',client.guilds.cache.get(data.serverID).id)
    })


  })
  
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
  console.log(token)

  // testing for thread update
  client.on(Events.MessageUpdate,async (oldMessage, newMessage) => {
    console.log('test')
  })
  client.login(token);
}

run()