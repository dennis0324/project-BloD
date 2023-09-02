import { fork } from 'child_process'
import { MSGUnion, READY } from './types'
import { Interaction } from 'discord.js'

const childWrapperPath = require.resolve(`./child`)

export type WorkerInfo = {
  workerId: number
  send: (msg: any) => void
  kill: (signal?: NodeJS.Signals | number) => boolean
  exitedPromise: Promise<{
    code: number | null
    signal: NodeJS.Signals | null
  }>
  // currentTask?: TaskInfo
  ready: Promise<void>
}

/**
 * type of task info for save each task
 */
// class TaskInfo<T>{
//   functionName: T
//   promise: Promise<any>
//   args: Array<any>
//   // assignedWorker?: WorkerInfo<T>
//   resolve!: (r:any) => void
//   reject!: (e:Error) => void

//   constructor(opts:{
//     functionName:T,
//     args:Array<any>,
//     assignedWorker?:WorkerInfo<T>
//   }){
//     this.functionName = opts.functionName
//     this.assignedWorker = opts.assignedWorker
//     this.args = opts.args
//     this.promise = new Promise((resolve,reject) => {
//       this.resolve = resolve
//       this.reject = reject
//     })
//   }
// }

class TaskInfo{
  // functionName?: 
  interaction?: Interaction
  promise: Promise<any>
  args: Array<any>
  // assignedWorker?: WorkerInfo<T>
  resolve!: (r:any) => void
  reject!: (e:Error) => void

  constructor(interaction:Interaction){
    this.interaction = interaction
  }
}

export class BloDWorker{
  private cpuCount:number


  private workers:Array<WorkerInfo> = []
  private idleWorkers:Set<WorkerInfo> = new Set()
  
  constructor(private opts?:{cpuCount:number}){
    this.startAll()
  }

  startAll(){

    let workerReadyResolve:() => void
    let workerExitResolve:(arg:{code: number | null, signal: NodeJS.Signals | null}) => void

    const options = this.opts
    for(let i = 0; i < (options?.cpuCount ?? 1); i++){
      const worker = fork(childWrapperPath,{
        cwd: process.cwd(),
        env:{
          
        }
      })

      const workerInfo:WorkerInfo = {
        workerId:i,
        send: (msg:any) => worker.send(msg),
        kill: (signal?: NodeJS.Signals | number) => worker.kill(signal),
        ready:new Promise<void>(resolve => {
          // this promise will be not resolved when ready is fulfilled
          // ready가 fulfilled 되었을 때 이 프로미스는 resolve 되지 않을 것이다.
          workerReadyResolve = resolve
        }),
        exitedPromise: new Promise(resolver => {
          // so as this promise
          // 이 프로미스도 마찬가지다.
          workerExitResolve = resolver
        })

      } 

      const messageHandler = (msg:MSGUnion) => {
        console.log(msg)
        switch(msg[0]){
          case READY:
            workerReadyResolve()
            console.log('reday')
            break;
        }
      }

      worker.on(`message`, messageHandler)
      worker.on(`exit`, async (code, signal) => {

        // if (workerInfo.currentTask) {
        //   // worker exited without finishing a task
        //   workerInfo.currentTask.reject(
        //     new Error(`Worker exited before finishing task`)
        //   )
        // }
        // remove worker from list of workers
        this.workers.splice(this.workers.indexOf(workerInfo), 1)
        workerExitResolve({ code, signal })
      })
      this.workers.push(workerInfo)
      this.idleWorkers.add(workerInfo)
    }
  }


  addInteractions(interaction:Interaction){

    const taskInfo = new TaskInfo(interaction)

    this.workers[0].send(taskInfo)
    // this.runTask(taskInfo)
  }
}