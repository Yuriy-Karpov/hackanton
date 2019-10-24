import {InterfaceBot} from "./interface";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {getState} from "../store/store";

export const rootMessage = async ({bot, peer}: InterfaceBot) => {

    const state = getState();
    const userProps = state.users[peer.id];

    if (!userProps) {
        await bot.sendText(
            peer,
            `У вас нет прав, обратитесь к Администратору`
        );
        return null;
    }

    const actions = userProps.apps.map((name: string) => {
        return Action.create({
            id: `app_menu#${name}`,
            widget: Button.create({label: name})
        });
    });

    await bot.sendText(peer, 'Какое из приложений интересует?', null, ActionGroup.create({
        actions: actions
    }));
};

export const appMenuHandler = async ({bot, peer}: InterfaceBot, param: string) => {
    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: `app_menu.jenkinsMenu#${param}`,
                widget: Button.create({label: 'Ci'})
            }),
            Action.create({
                id: `app_menu.shhMenu#${param}`,
                widget: Button.create({label: 'Информация о сервере'})
            }),
        ]
    }))
};