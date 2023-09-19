import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { token } from "../../envConfig";
import { applicationID } from 'envConfig'
import { BLoDDiscordSocket } from "@/socket-io";

export const onReady = async (socketManager:BLoDDiscordSocket) => {
  const rest = new REST().setToken(
    token as string
  );
  const commandData = socketManager.getClient().commands.map((command) => command.data.toJSON());
  const guildID = socketManager.getClient().guilds.cache.first().id;

  await rest.put(
    // clientid, guildid
    Routes.applicationGuildCommands(applicationID, guildID),
    { body: commandData }
  );

  console.log("Discord ready!",socketManager.getClient().application.id);
  socketManager.discordReady()
  
  //TODO: 해당 디스코드 봇이 2개 이상의 서버에 들어가있다면 WARN 띄우기
  // socketManager.getSocket().emit('discord:ready',{id:socketManager.getClient().application.id})
};