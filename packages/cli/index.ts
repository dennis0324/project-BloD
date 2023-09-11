//TODO: nestjs / nextjs / webpack 반환값 분리해서 내가 만든 커스텀 로거로 출력하기
import { spawn } from 'child_process'
import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
import chalk from 'chalk'

// const { combine, timestamp, label, printf } = winston.format;

// const logFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
// });

//TODO: 정적실행이 아니라 동적으로 실행하기
// {
//  run: []
//  handler: () => {}
// }

//for nextjs
// - event compiled client and server successfully in 181 ms (20 modules)

//for nestjs
//[Nest] 5165  - 09/02/2023, 12:53:12 AM     LOG [InstanceLoader] ViewModule dependencies initialized +0ms

//for webpack 
//[12:53:11 AM] Found 0 errors. Watching for file changes.

//for nodemon
// [nodemon] starting `ts-node -r tsconfig-paths/register index.ts`
const log = console.log
enum NextLog {
  NAME = 0,
  CODE = 1,
  TIME = 3,
  TYPE = 4,
  OBJECT = 5,
}
const nest = spawn('npm', ['run',"dev:nest"])
const discord = spawn('npm', ['run',"dev:discord"])

// const logger = winston.createLogger({
//   //* 로그 출력 형식 정의
//   format: combine(
//      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//      label({ label: 'Winston 연습 어플리케이션' }), // 어플리케이션 이름
//      logFormat, // log 출력 포맷
//      //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
//   ),
//   transports:[
//     new winstonDaily({
//       level: 'info', // info 레벨에선
//       datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
//       // dirname: logDir, // 파일 경로
//       filename: `%DATE%.log`, // 파일 이름
//       maxFiles: 30, // 최근 30일치 로그 파일을 남김
//       zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
//    }),
//   ]
// });

// [NestNext] - 시간 - 로그레벨 - [nest/next([데이터])] - 메세지(시간)

nest.stdout.on('data', (data:string) => {
  data = data.toString()
  const ansiEscape = new RegExp(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g)
  const nextReg = new RegExp(/\[.*?\]\s|\s{2,}/)
  const reg = new RegExp('(' + ansiEscape.source + ')|(' + nextReg.source + ')')

  var ese = data.replace(ansiEscape,'')
  console.log(ese.match(/\b(\w+)\b/g))
  // const pattern1 = /([\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><])
  if(data.search(/(\[.*?\]\s)/) !== -1){
    // process.stdout.write(data)
    // nestjs
    console.log(ese)

    if(data.includes('[Nest]')){
      // ese = data.split(ansiEscape)
      // ese = data.split(nextReg).filter((e:string) => (e ? e.match(/\S/): false))
      // ese =  ese.filter(e => !e.match(ansiEscape))
      // ese = data.split(nextReg).filter((e:string) => (e ? e.match(/\S/): false))
      // ese = ese.filter((e:string) => {
      //   console.log(e)
      //   return e.match(/\S/)
      // })
      console.log(ese)
      // var ese = removeEnter.split(/(\[.*?\]\s|\s{2,})/).filter((e:string) => e.match(/\S/))
      // console.log(ese[0])
      if((ese[0] as string).includes('[Nest]')){
        // ese = ese.map((e:string) => e.trim())
        console.log(ese)
        // process.stdout.write(chalk.yellowBright('[NestNext]') + ' - ' + chalk.yellow(ese[NextLog.TIME]) + ' - ' + chalk.greenBright(ese[NextLog.TYPE]) + ' - ' + chalk.blueBright(ese[NextLog.NAME])+chalk.whiteBright('('+ese[NextLog.OBJECT]+')'))
        // log(chalk.yellowBright('[NestNext]') + ' - ' + chalk.yellow(ese[NextLog.TIME]) + ' - ' + chalk.greenBright(ese[NextLog.TYPE]) + ' - ' + chalk.blueBright(ese[NextLog.NAME])+chalk.whiteBright('('+ese[NextLog.OBJECT]+')'))
        // logger.info('Nest')
        // for(let i = 6; i <ese.length; i++){
        //   console.log(ese[i])
        // }
      }
      else if((ese[0] as string).includes('['))
        console.log('next')
      // console.log(ese)
    }
    // webpack
    else{
      // var ese = data.split(ansiEscape)
      // console.log(ese)
    }
  }
  else{
    // console.log(data)
  }


  // if(replacedText.startsWith('-:-')){
  //   console.log(replacedText.split('-:-'))
  //   console.log('nestjs')
  // }
  // else if(replacedText.startsWith('-')){
  //   const str:string = replacedText.replace('-','')
  //   console.log(str)
  // }
  // console.log(`stdout: ${replacedText}`);
})

discord.stdout.on('data', (data:string) => {

})
//