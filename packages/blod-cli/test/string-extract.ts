import {Extract } from "../src/util/stringExtracter";

const t = new Extract('{name} {code}  - {date}     {log} {Object} {message}')


console.log(t.extract( `[Nest] 13045  - 09/11/2023, 9:48:22 PM     LOG [SocketIoAdapter] Object:
{
  "cors": {
    "origin": [
      "http://localhost:3000",
      "/\\/^http:\\/\\/192.168.1.([1-9]|[1-9]d):3000$\\//"
    ]
  }
}`,{
  newLineSperator:{
    start:'\n',
    end:'[Nest]',
    align:'center'
  }
}))
