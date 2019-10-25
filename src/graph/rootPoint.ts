import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {getState} from "../store/store";
import {InterfaceBot} from "../model/interface";

export const rootMessage = async ({bot, peer}: InterfaceBot) => {

    const state = getState();
    const user = state.users[peer.id];

    if (!user) {
        await bot.sendText(peer, `У вас нет прав, обратитесь к Администратору`);
        return null;
    }

    const actions = user.apps.map((name: string) => {
        return Action.create({
            id: `app_menu#${name}`,
            widget: Button.create({label: name})
        });
    });

    if (user.admin) {
        actions.push(Action.create({
            id: `admin_menu`,
            widget: Button.create({label: 'Управление правами'})
        }))
    }
    await bot.sendText(peer, 'Какое из приложений интересует?', null, ActionGroup.create({
        actions: actions
    }));
};

export const adminMenuHandler = async ({bot, peer}: InterfaceBot, param: string) => {

    const state = getState();
    const user = state.users;
    // let usersRole:string = '';
    for (let key in user) {
        const apps = user[key].apps.join(', ');
        const usersRole: string = `
            user_id: ${key}
            имя: ${user[key].name}
            доступны АС: ${apps} \n`;
        await bot.sendText(
            peer, usersRole);
    }
    await bot.sendText(
        peer, '', null,
        ActionGroup.create({
            actions: [
                Action.create({
                    id: `admin_menu.add`,
                    widget: Button.create({label: 'Добавить роли'})
                }),
                Action.create({
                    id: `admin_menu.del`,
                    widget: Button.create({label: 'Убрать роли'})
                }),
            ]
        })
    );
};


export const adminAddHandler = async ({bot, peer}: InterfaceBot, param: string) => {
    const state = getState();
    const apps = state.appList;
    const appsNames = [];
    for (let key in apps) {
        appsNames.push(key)
    }
    const appsNamesStr = appsNames.join(', ');
    await bot.sendText(peer, `Для добавления наберите следующую команду 
/add [user_id] [NAME_APP]
Доступные приложения (NAME_APP): ${appsNamesStr}`)
};

export const adminDelHandler = async ({bot, peer}: InterfaceBot, param: string) => {
    await bot.sendText(peer, `Для удаления наберите следующую команду 
/del [user_id] [NAME_APP]`)
};


export const appMenuHandler = async ({bot, peer}: InterfaceBot, param: string) => {
    await bot.sendText(peer, 'Чем могу помочь?', null, ActionGroup.create({
        actions: [
            Action.create({
                id: `app_menu.jenkinsMenu#${param}`,
                widget: Button.create({label: 'Ci'})
            }),
            Action.create({
                id: `app_menu.shhMenu#${param}`,
                widget: Button.create({label: 'Сервера'})
            }),
        ]
    }))
};
