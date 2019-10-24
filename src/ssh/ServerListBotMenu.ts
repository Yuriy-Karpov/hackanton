import {getAnswer} from "../utils";
import {InterfaceBot} from "../model/interface";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {buildWithProp} from "../utils/BuildWithPropUtil";

const HOST = 'host';
const USER_NAME = 'username';
const PASS = 'password';

const ServerListMenu = async ({bot, peer}: InterfaceBot) => {
    /*  await bot.sendText(
          peer,
          `Какой именно сервер интересует?`
      );*/

    await bot.sendText(peer, 'Выбери сервер', null, ActionGroup.create({
        actions: makeButtonsToChooseServer(['server_1', 'server_2', 'server_3'])
    }))
};

const makeButtonsToChooseServer = (serverNames: string[]) =>
    serverNames.map(serverName =>
        Action.create({
            id: serverName,
            widget: Button.create({label: serverName})
        }));


const info_shh_sina32 = async ({bot, peer}: InterfaceBot) => {

    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    await bot.sendText(
        peer,
        `тут я хожу за инфой для сервера`
    );
    // const shh = new SshConnenction(HOST, USER_NAME, PASS);
    //
    // const uptime = await shh.getUptime();
    // await bot.sendText(
    //     peer,
    //     String(uptime)
    // );
};

export const ServerListMenuAndHandler = (interfaceBot: InterfaceBot) => ({
    message: buildWithProp(ServerListMenu, interfaceBot),
    children: {
        info_shh_sina32: {
            message: buildWithProp(info_shh_sina32, interfaceBot)
        },
        info_shh_sina33: {
            message: buildWithProp(info_shh_sina32, interfaceBot)
        },
        info_shh_sina34: {
            message: buildWithProp(info_shh_sina32, interfaceBot)
        }
    }
});


