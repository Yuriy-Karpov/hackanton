import dotenv from 'dotenv';
import {Run} from './bot/bot';
import {RunHandler} from './githubWebhooksHandler/webhookHandler';
import Http from "http";

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

Http.createServer(function (req, res) {
  RunHandler('myhashsecret', '/webhook')(req, res, function () {
    res.statusCode = 404;
    res.end('no such location')
  })
}).listen(7777);
