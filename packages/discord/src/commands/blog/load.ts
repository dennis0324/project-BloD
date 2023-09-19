import { Command } from "@/interfaces/command";
import { EmbedBuilder, ForumChannel, SlashCommandBuilder } from "discord.js";
import { getTitles } from "@/utility/discord";


const appName = 'BloD'
export const restart: Command = {
  data: new SlashCommandBuilder().
    setName('load').
    setDescription('load blog post from discord'),
  //TODO: 아마 채널 속성 중에서 최근에 수정한 쓰레드들 관련해서 저장되어있는 속성이 있을 텐데 나중에 
  //      로드 관련해서 interval로 사용할 경우에는 이 속성을 통해서 해당되는 속성만 가지고 온다.
  run: async (interaction,bot) => {

    await interaction.deferReply();
    // interaction.guild
    // load를 했을 경우 한 라이브러리의 메세지를 확인하기 위함이다.
    // interaction를 실행한 guild의 채널을 확인후 특정 채널을 찾는다.
    const channel = interaction.guild.channels.cache.find(channel => channel.id === '1088461106701422735')
    const threads = await getTitles(channel as ForumChannel,5,0)
    // TODO : need to upload to nextjs server 

    const { user } = interaction;

    const load = new EmbedBuilder();
    load.setTitle(`[${appName}] Load Manager`);
    load.setDescription('blog load complete');
    load.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });

    await interaction.editReply({ embeds: [load] });
  }
}