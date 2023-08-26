import { Command } from "@/interfaces/command";
import { SlashCommandBuilder } from "discord.js";

export const restart: Command = {
  data: new SlashCommandBuilder().
    setName('restart').
    setDescription('restart the bot'),
  run: async (interaction) => {
    
  }
}