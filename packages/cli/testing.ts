//TODO: nestjs / nextjs / webpack 반환값 분리해서 내가 만든 커스텀 로거로 출력하기
import { spawn } from 'child_process'

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
const testing1 = spawn('npm', ['run',"dev:nest"])

testing1.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})

