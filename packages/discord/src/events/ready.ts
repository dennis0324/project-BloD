import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
// import { Client } from "discord.js";
import {BloDClient as Client} from "../interfaces/client";
import { token } from "../../config";
import { Socket } from "socket.io-client";
import { applicationID } from 'config'
// import { CommandList } from "../../temp";

export const onReady = async (BOT: Client,socket:Socket) => {
  const rest = new REST().setToken(
    token as string
  );
  const commandData = BOT.commands.map((command) => command.data.toJSON());
  const guildID = BOT.guilds.cache.first().id;

  await rest.put(
    // clientid, guildid
    Routes.applicationGuildCommands(applicationID, guildID),
    { body: commandData }
  );

  console.log("Discord ready!",BOT.application.id);

  //TODO: 해당 디스코드 봇이 2개 이상의 서버에 들어가있다면 WARN 띄우기
  socket.emit('ready',{id:BOT.application.id})
};