import { createServer } from "http"
import { Server, Socket } from 'socket.io'

// async function writeUserData(id:string,password:string) {
//   const db = getDatabase();
//   const docRef = await addDoc(collection(db, "users"), {
//     id:id,
//     password:password
//   });
// }

export async function runServer(){
  const httpServer = createServer()
  // await writeUserData('test','test')
  const io = new Server(httpServer,{
    // cors: {
    //   origin: "http://localhost:3000",
    //   methods: ["GET", "POST"],
    //   credentials: true
    // }
  })

  /**
   * this is for admin
   */


  io.on('connection',(socket:Socket) => {
    console.log(socket.id)

    socket.emit('getBlogPost',{serverID:'980836436456644619'})

    socket.on('getBlogPost',async (data) => {
      console.log(data)
    })
  })




  io.listen(3000);
}

runServer()