import {getAnswer} from "../utils";
import {InterfaceBot} from "./interface";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {buildWithProp} from "./util";

const HOST = 'host';
const USER_NAME = 'username';
const PASS = 'password';

const sshMenu = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `Какой именно сервер интересует?`
    );

    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'shhMenu.info_shh_sina32',
                widget: Button.create({label: 'SINA 32'})
            }),
            Action.create({
                id: 'shhMenu.info_shh_sina33',
                widget: Button.create({label: 'SINA 33'})
            }),
            Action.create({
                id: 'shhMenu.info_shh_sina34',
                widget: Button.create({label: 'SINA 34'})
            }),
        ]
    }))
};


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

export const sshMenuAndHandler = (interfaceBot: InterfaceBot) => ({
    message: buildWithProp(sshMenu, interfaceBot),
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


