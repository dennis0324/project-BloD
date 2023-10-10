import WebSocket from 'ws';

const ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');

let interval:NodeJS.Timeout = null;

// const token = 'MjY3OTU0MzEyNzIwNjc4OTEy.GQqeUe.EG-t51523eOAdFLT5Lq_9kLXgeGoqmCgGWpnJ8';
// const token = ''

const payload = {
  op:2,
  d: {
    // token: token,
    intents: 513,
    properties: {
      $os: 'linux',
      $browser: 'chrome',
      $device: 'chrome'
    }
  }
}

ws.on('open', () => {
  ws.send(JSON.stringify(payload))
})

ws.on('message',(data:any) => {
  let payload = JSON.parse(data)
  const {t, event, op ,d } = payload;
  
  switch(op){
    case 10:
      const {heartbeat_interval} = d;
      console.log(heartbeat_interval)
      interval = heartbeat(heartbeat_interval)
      break;
  }
  console.log(op,t)
  switch(t) {
    case 'MESSAGE_CREATE':
      let author = d.author;
      let content = d.content;
      console.log(author, content)
  }
})

function heartbeat(ms:number){
  return setInterval(() => {
    ws.send(JSON.stringify({
      op: 1,
      d: null
    }))
  },ms);
}
