import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../../interfaces/command";
import { EmbedBuilder } from "discord.js";

export const oneHundred: Command = {
  data: new SlashCommandBuilder()
    .setName("100")
    .setDescription("Check in for the 100 Days of Code challenge.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to go in your 100 Days of Code update.")
        .setRequired(true)
    ),
  run: async (interaction,bot) => {
    await interaction.deferReply();
    const { user } = interaction;


    const oneHundredEmbed = new EmbedBuilder();
    oneHundredEmbed.setTitle("100 Days of Code");
    oneHundredEmbed.setDescription('text');
    oneHundredEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    oneHundredEmbed.addFields();
    oneHundredEmbed.addFields([{name:"Round", value:'1', inline:true},{name:"Day", value:'2', inline:true}]);
    oneHundredEmbed.setFooter({
      text:
        "Day completed: "
    });

    await interaction.editReply({ embeds: [oneHundredEmbed] });
  },
};