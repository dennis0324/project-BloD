import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })
export const token = process.env.TOKEN
export const applicationID = process.env.APPLICATIONID
export const BLOD_MESSAGE_SECRET = process.env.BLOD_MESSAGE_SECRET