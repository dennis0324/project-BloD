import * as dotenv from "dotenv";
import path from 'path'
import fs from 'fs'
import * as password from 'secure-random-password'

const envPath = path.join('..','..','..','.env')
const fd = fs.openSync(path.resolve(__dirname,envPath),"r+")
const env = fs.readFileSync(fd)
const envVars = env.toString().split('\n')
console.log(envVars)
if(!envVars.find((envVar:string) => envVar.includes('BLOD_MESSAGE_SECRET'))){
  console.log('BLOD_MESSAGE_SECRET not found')
  console.log('generating new BLOD_MESSAGE_SECRET')
  fs.closeSync(fd)
  fs.openSync(path.resolve(__dirname,envPath),"a")
  const pass = password.randomPassword({ length: 64, characters: [password.lower, password.upper, password.digits, password.symbols]})
  fs.writeFileSync(fd,`\nBLOD_MESSAGE_SECRET="${pass}"`)
}
fs.closeSync(fd)

// fs.open(path.resolve(__dirname,'../../.env'),"a",function(e,fd) {
//   fs.read(fd,)
//   fs.write(fd,)
//   fs.closeSync(fd)
// })
// dotenv.config({ path: path.resolve(__dirname, '../../.env') })