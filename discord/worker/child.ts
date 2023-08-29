import { MSGUnion, READY } from "./types"

if(process.send){

  const messageHandler = (msg:MSGUnion) => {
    console.log(msg)
  }
  process.on('message',messageHandler)


  process.send([READY])
}