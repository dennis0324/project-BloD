import { BLoDDiscordSocket } from "@/socket-io";
import { BloDClient } from "@/utility/blod-client";
import { Interaction } from "discord.js";
// import { CommandList } from "../../temp";

export const onInteractionCreate = async (socketManager:BLoDDiscordSocket,interaction:Interaction) => {
  if (!interaction.isChatInputCommand()) return;
    
  const command = (interaction.client as BloDClient).commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.run(interaction, socketManager.getClient());
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
};