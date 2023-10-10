// Require the necessary discord.js classes
import { Events, GatewayIntentBits, Interaction, Partials, TextChannel, WebhookClient, } from 'discord.js';
import { token } from './envConfig';
import { onReady } from "@/events/ready";
import { onInteractionCreate } from '@/events/interaction-create';
import { BloDClient } from 'src/utility/blod-client';
import { BLoDDiscordSocket } from '@/socket-io';
import { onMessageUpdate } from '@/events/message-update';
import { onMessageCreate } from '@/events/message-create';


export async function run(){
  
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
  const discordSocket = new BLoDDiscordSocket(client)

  client.on(Events.ClientReady, async () => await onReady(discordSocket));

  client.on(Events.InteractionCreate, async (interaction: Interaction ) => { onInteractionCreate(discordSocket,interaction)})

  // Log in to Discord with your client's token
  // text update
  // TODO: if thread channel get updated, send to socket for update
  client.on(Events.MessageUpdate,async (oldMessage, newMessage) => onMessageUpdate(discordSocket,newMessage))

  client.on(Events.MessageCreate, async (message) => onMessageCreate(discordSocket,message))
  client.login(token);
}

run()