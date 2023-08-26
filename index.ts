// Require the necessary discord.js classes
import { Events, GatewayIntentBits, Interaction } from 'discord.js';
import { token } from './config';
import { onReady } from "./src/events/ready";
import { oneHundred } from "./src/commands/testing/onHundred";
import clientManager, { BloDClient } from 'src/utility/blod-client';


async function run(){
  // Create a new client instance
  const client = new BloDClient({ intents: [GatewayIntentBits.Guilds] });
  client.on("ready", async () => await onReady(client));

  // We use 'c' for the event parameter to keep it separate from the already defined 'client'
  client.on(Events.InteractionCreate, async (interaction: Interaction ) => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = (interaction.client as BloDClient).commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.run(interaction);
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
  client.login(token);
}

run()