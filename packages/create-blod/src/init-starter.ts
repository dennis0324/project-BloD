import { execa } from "execa";
import { createSpinner } from 'nanospinner'
import fs from 'fs-extra'
import path from 'path'

export async function clone(
  url: string,
  rootPath: string,
  branch?: string
){
  const branchArg = branch ? ['-b', branch] : []
  const args = [
    'clone',
    ...branchArg,
    url,
    rootPath,
    '--quiet'
  ]
  const gitCloning = createSpinner('Cloning git...')
  try {
    await execa(`git`, args)

    gitCloning.update({text:'Git cloned'})
  } catch (err) {
    gitCloning.error({text:(err as Error).message})
  }  execa('git',args)

  gitCloning.stop()
  await fs.remove(path.join(rootPath, `.git`))
  await fs.remove(path.join(rootPath, `LICENSE`))  
}
/**
 * 
 * @param sitePath this is package root path
 */
const setPackageName = async (sitePath:string) => {
  const packagePath = path.join(sitePath, 'package.json')
  const packageJson = await fs.readJson(packagePath)

  const createPackage = createSpinner('Setting package name...').start()
  try{
    const execute = await execa('git',['config','user.name'])
    if(!execute.failed){
      packageJson.name = execute.stdout
    }
    else{
      delete packageJson.name
    }
  }catch(err){
    delete packageJson.name
  }

  createPackage.success({text:'Package name set'})
} 


export const install = async () => {
  const installSpinner = createSpinner('Installing dependencies...').start()
  try {
    await execa('npm', ['install','--quiet'])
    installSpinner.success({text:'Dependencies installed'})
  } catch (err) {
    installSpinner.error({text:(err as Error).message})
  }
}
/**
 * 
 * @param rootPath where you want to install   
 * @returns 
 */
export const gitInit = async (rootPath: string) => 
  await execa('git', ['init'],{cwd: rootPath})

export async function initStarter(){

  // git init
  await clone();
  // set package name
  await setPackageName();
  // install
  await install();


}