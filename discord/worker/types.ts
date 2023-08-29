export const READY = 1
export const EXECUTE = 2
export enum RUNFUN{
  DISCORD = 1,
  FUNCTION = 2
}

export type MSGUnion = 
  ReadyMsg | 
  ExecuteMsg

type FunctionName = string | number | symbol

type ReadyMsg = [typeof READY]

type ExecuteMsg = [typeof EXECUTE, RUNFUN, FunctionName, Array<any>]



