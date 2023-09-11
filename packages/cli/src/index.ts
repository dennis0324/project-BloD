import {extract} from "./stringExtracter/extracter";

// const testing = extracter();

const t = extract('{name} {code}  - {date}     {log} {Object} {message}', `[Nest] 13045  - 09/11/2023, 9:48:22 PM     LOG [SocketIoAdapter] Object:
{
  "cors": {
    "origin": [
      "http://localhost:3000",
      "/\\/^http:\\/\\/192.168.1.([1-9]|[1-9]d):3000$\\//"
    ]
  }
}`)

console.log(t)
