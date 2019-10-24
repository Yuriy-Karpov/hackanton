import {getAnswer, sleep} from "../utils";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {getState} from "../store/store";
import {InterfaceBot} from "../model/interface";
import {buildWithProp} from "../utils/BuildWithPropUtil";
// import {buttonMenu, sshMenuAndHandler} from "../ssh/SingleServerBotMenu";
import {ServerData} from "../model/class";
import {getServerInfo} from "../ssh/SshService";
import {jenkinsBuild, jenkinsBuildNoParams} from "../jenkinsManage/jenkinsManage";
import {serverList} from "../store/appList";
import axios from "axios";

const HOST = 'host';
const USER_NAME = 'username';
const PASS = 'password';

const sshMenu = async ({bot, peer}: InterfaceBot, param: string) => {
    await bot.sendText(peer,`${getAnswer()}`);
    const state = getState();

    const app = state.appList[param];


    if (!app) {
        await bot.sendText(
            peer,
            `Каких-то опций не хватает, обратитесь к Администратору`
        );
        return null;
    }
    for(let serverName of app.servers) {
        console.log('++######serverName', serverName)
        // const serverData: ServerData = await getServerInfo(serverName);
        const response: ServerData = await axios.get(`http://${serverName}:9000/info`);
        const {data:serverData}:any = response;
        const message = `Данные по ${serverName}: \n
        UPTIME: ${serverData.uptime}\n
        CPU: ${serverData.proc}%\n
        RAM: ${serverData.ram}%\n
        HDD: ${serverData.hard}%`;
        await bot.sendText(peer, message);
    }


    const actions = app.servers.map((name: string) => {
        return Action.create({
            id: `app_menu.shhMenu.info_id#${name}`,
            widget: Button.create({label: name})
        });
    });

    await bot.sendText(peer, 'Какой именно сервер интересует?', null, ActionGroup.create({
        actions: actions
    }));

};


export const buttonMenu = async ({bot, peer}: InterfaceBot, serverName: string) => {
    // await bot.sendText(peer,`${getAnswer()}`);

    await bot.sendText(peer, 'Что с ним сделать?', null, ActionGroup.create({
        actions: [
            Action.create({
                id: `app_menu.shhMenu.info_id.rebut#${serverName}`,
                widget: Button.create({label: 'Рестарт'})
            }),
            Action.create({
                id: `app_menu.shhMenu.info_id.clear#${serverName}`,
                widget: Button.create({label: 'Очистка Tmp'})
            })
        ]
    }));

    // await bot.sendText(peer, message, null, createActionGroup([serverRestartCommand, clearTempCommand]))
};

export const rebutSsh = async ({bot, peer}: InterfaceBot, serverName: string) => {
    await bot.sendText(peer,`${getAnswer()}`);
    const state = getState();
    const serverItem = state.serverList[serverName];
    await jenkinsBuildNoParams(serverItem.jobRestart);
    await bot.sendText(peer,
        `Сервер ${serverName} был перезагружен`
    );
};
export const clearSsh = async ({bot, peer}: InterfaceBot, serverName: string) => {
    await bot.sendText(peer,`${getAnswer()}`);
    const state = getState();
    const serverItem = state.serverList[serverName];
    await jenkinsBuildNoParams(serverItem.jobRestart);
    await bot.sendText(peer,
        `На сервере ${serverName} была очищена Tmp`
    );
};

export const sshMenuServer = (interfaceBot: InterfaceBot) => ({
    message: buildWithProp(sshMenu, interfaceBot),
    children: {
        info_id: {
            message: buildWithProp(buttonMenu, interfaceBot),
            children: {
                rebut: {
                    message: buildWithProp(rebutSsh, interfaceBot),
                },
                clear: {
                    message: buildWithProp(clearSsh, interfaceBot),
                }
            }
        }
    }
});


