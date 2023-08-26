import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
// import { Client } from "discord.js";
import {BloDClient as Client} from "../interfaces/client";
import { token } from "../../config";
// import { CommandList } from "../../temp";

export const onReady = async (BOT: Client) => {
  const rest = new REST().setToken(
    token as string
  );
  const commandData = BOT.commands.map((command) => command.data.toJSON());
  await rest.put(
    // clientid, guildid
    Routes.applicationGuildCommands('1144512105589002260', '980836436456644619'),
    { body: commandData }
  );

  console.log("Discord ready!");
};