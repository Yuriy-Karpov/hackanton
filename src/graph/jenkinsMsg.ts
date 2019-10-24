import {InterfaceBot} from "./interface";
import {buildWithProp} from "./util";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";

const jenkinsMenu = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `Какой именно сервер интересует?`
    );
    // await jenkinsInfo()
    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'shhMenu',
                widget: Button.create({label: 'Посмотреть статус по серверам'})
            }),
            Action.create({
                id: 'id_1',
                widget: Button.create({label: 'jenkins далее'})
            }),
            Action.create({
                id: 'id_2',
                widget: Button.create({label: 'jenkins info'})
            }),
            Action.create({
                id: 'jenkinsMenu',
                widget: Button.create({label: 'Установка сборки'})
            }),
        ]
    }))
};


/**
 * Узел Графа для Jenkins
 * @param interfaceBot
 */
export const jenkinsBuildConnect = (interfaceBot: InterfaceBot) => ({
    message: buildWithProp(jenkinsMenu, interfaceBot),
    children: {
        build_1: {
            message: buildWithProp(build_1, interfaceBot)
        },
        build_2: {
            message: buildWithProp(build_1, interfaceBot)
        },
        build_3: {
            message: buildWithProp(build_1, interfaceBot)
        }
    }
});

const build_1 = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `Какой именно сервер интересует?`
    );
};
