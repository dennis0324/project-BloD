import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

export default () => ({
  BLOD_MESSAGE_SECRET: process.env.BLOD_MESSAGE_SECRET,
});
