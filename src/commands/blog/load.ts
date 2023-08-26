import { Command } from "@/interfaces/command";
import { EmbedBuilder, ForumChannel, SlashCommandBuilder } from "discord.js";

export const restart: Command = {
  data: new SlashCommandBuilder().
    setName('load').
    setDescription('load blog post from discord'),
  //TODO: 아마 채널 속성 중에서 최근에 수정한 쓰레드들 관련해서 저장되어있는 속성이 있을 텐데 나중에 
  //      로드 관련해서 interval로 사용할 경우에는 이 속성을 통해서 해당되는 속성만 가지고 온다.
  run: async (interaction) => {
    // interaction.guild
    // load를 했을 경우 한 라이브러리의 메세지를 확인하기 위함이다.
    // interaction를 실행한 guild의 채널을 확인후 특정 채널을 찾는다.
    interaction.guild.channels.cache.forEach(channel => {
      // 포럼 채널을 가지고 오는 것이 아니라 사용자가 지정해준 채널 ID를 가지고 오게 시킨다.
      // TODO: set channel id를 통해서 사용자가 채널 ID를 지정할 수 있게 한다. 
      if(channel.id === '1088461106701422735')
      // 포럼 채널에서 모든 글을 가지고 온다.
      (channel as ForumChannel).threads.cache.forEach(thread => {
        console.log(thread.messages)
      })
    })
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
  }
}