import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

export default () => ({
  BLOD_MESSAGE_SECRET: process.env.BLOD_MESSAGE_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
});
