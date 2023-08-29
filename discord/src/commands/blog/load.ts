import { Command } from "@/interfaces/command";
import { EmbedBuilder, ForumChannel, SlashCommandBuilder } from "discord.js";
import { fork } from 'child_process'

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
    await Promise.all(interaction.guild.channels.cache.map(async channel => {
      // 포럼 채널을 가지고 오는 것이 아니라 사용자가 지정해준 채널 ID를 가지고 오게 시킨다.
      // TODO: set channel id를 통해서 사용자가 채널 ID를 지정할 수 있게 한다. 
      if(channel.id === '1088461106701422735'){
        const threads = await (channel as ForumChannel).threads.fetch({archived:{limit:100}})
        console.log(threads)
        // 포럼 채널에서 모든 글을 가지고 온다.
        for await (const thread of threads.threads.values()){
          console.log('\n'+thread.name)
          // const messages = await thread.messages.fetch()
          // messages.forEach(message => {
          //   console.log(message.content)
          // })
        }
      }

      
    })) 

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