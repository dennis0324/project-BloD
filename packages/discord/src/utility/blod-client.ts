import { Client, ClientOptions, Collection, Interaction } from "discord.js";
import { Command } from "src/interfaces/command";
// import { BloDClient } from "@/interfaces/client";
import { globSync } from 'glob'
import {BLOD_MESSAGE_SECRET} from 'envConfig'
import jwt from "jsonwebtoken";

import path from 'path';

export default class ClientManger{
  __dirname = path.resolve('.');
  
  /**
   * for making client instance to start discord bot
   * @param clientOptions 
   * @returns 
   */
  static async create(clientOptions:ClientOptions){
    const client = new BloDClient(clientOptions);
    // await client.setup();
    return client;
  }
} 

export class BloDClient extends Client{

  // Collection that holds all of the commands posting to the API
  commands: Collection<string, Command>;

  // Collection that holds all of the commands posting to the API
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();

    const commandPath = path.join(process.cwd(),'src','commands','**','*.ts');
    const testing = globSync(commandPath)
    console.log(testing)

    testing.forEach(file => {
      const commands:{[key:string]:Command} = require(file);
      Object.values(commands).forEach(command => {
        if ('data' in command && 'run' in command) {
          this.commands.set(command.data.name, command);
        } else {
          console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
        }
      })
    })
  }

  createToken(){
    return jwt.sign({},BLOD_MESSAGE_SECRET)
  }
}

export type BlobClient = typeof BloDClient;
