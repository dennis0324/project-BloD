import { Manager, Socket } from 'socket.io-client';

export class BloDSocketIO{
  private static manager:Manager
  private static socket: Map<string,Socket> = new Map()
  static getPolls(){
    if(!this.manager) {
      this.manager = new Manager("http://localhost:3000",{
        reconnectionDelayMax: 10000,
      });
    }

    // console.log(this.socket)
    if(this.socket.has('/polls')) return this.socket.get('/polls')
    else {
      const socket = this.manager.socket("/polls");
      this.socket.set('/polls',socket)
      return socket
    }


    // return this.manager.socket("/polls");
  }

} 