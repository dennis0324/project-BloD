import { initStarter } from "./init-starter.js";

export async function run(){
  await initStarter()
}
// serve
  // npm run 
  // open browser to discord(package: blod-auth) 
    // 해당 디스코드 인증 사이트 열어주기 scope랑 redirect url, client id, client secret 등록
      /**
       * client_id=1144512105589002260
       * &
       * redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect
       * &
       * response_type=code
       * &
       * scope=identify%20email
       */
    // 토근 관리  AuthModule

// 