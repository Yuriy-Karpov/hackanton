import {InterfaceBot} from "../model/interface";
import {ServerData} from "../model/class";
import {clearTmp, getServerInfo, serverRestart} from "./SshService";
import {createActionGroup} from "./ActionCreatorUtil";

const serverRestartCommand = 'serverRestartCommand';
const clearTempCommand = 'clearTempCommand';

const buttonMenu = async (serverName: string, {bot, peer}: InterfaceBot) => {

    const serverData: ServerData = await getServerInfo(serverName);
    const message = `Данные по ${serverName}: \nUPTIME: ${serverData.uptime}\nCPU: ${serverData.cpu}\nRAM: ${serverData.ram}\nHDD: ${serverData.hdd}`;
    await bot.sendText(peer, message, null, createActionGroup([serverRestartCommand, clearTempCommand]))
};

const makeCommand = async (commandName: string, serverName: string, {bot, peer}: InterfaceBot) => {

    await bot.sendText(peer, 'started');
    if (commandName === serverRestartCommand) {
        await serverRestart(serverName);
    } else {
        await clearTmp(serverName);
    }
    await bot.sendText(peer, "done");
};


const areYouSure = ({bot, peer}: InterfaceBot) =>
    bot.sendText(peer, "Вы уверены?", null, createActionGroup(["yes", "no"]));

export const sshMenuAndHandler = (serverName: string, interfaceBot: InterfaceBot) => ({
    message: buttonMenu(serverName, interfaceBot),
    children: {
        serverRestartCommand: {
            message: areYouSure(interfaceBot),
            children: {
                yes: {message: makeCommand(serverRestartCommand, serverName, interfaceBot)},
            }
        },
        clearTempCommand: {
            message: areYouSure(interfaceBot),
            children: {
                yes: {message: makeCommand(clearTempCommand, serverName, interfaceBot)},
            }
        },
    }
});
