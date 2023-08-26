import { Client, Collection } from "discord.js";
import { Command } from "./command";

export interface BloDClient extends Client {
  commands: Collection<string,Command>
}