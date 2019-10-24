import dotenv from 'dotenv';
import {Run} from './bot/bot';

dotenv.config();

const token:string = process.env.BOT_TOKEN || '';
if (!token) {
  throw new Error('Add .env file');
}

const endpoint =
  process.env.BOT_ENDPOINT || 'https://grpc-test.transmit.im:9443';

Run(token, endpoint).catch((error) => {
  console.error(error);
  process.exit(1);
});
