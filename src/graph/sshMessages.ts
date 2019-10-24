import {getAnswer} from "../utils";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {getState} from "../store/store";
import {InterfaceBot} from "../model/interface";
import {buildWithProp} from "../utils/BuildWithPropUtil";

const HOST = 'host';
const USER_NAME = 'username';
const PASS = 'password';

const sshMenu = async ({bot, peer}: InterfaceBot, param: string) => {

    const state = getState();
    const appProps = state.appList[param];

    if (!appProps) {
        await bot.sendText(
            peer,
            `Каких-то опций не хватает, обратитесь к Администратору`
        );
        return null;
    }

    const actions = appProps.servers.map((name: string) => {
        return Action.create({
            id: `app_menu#${name}`,
            widget: Button.create({label: name})
        });
    });

    await bot.sendText(peer, 'Какой именно сервер интересует?', null, ActionGroup.create({
        actions: actions
    }));

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


