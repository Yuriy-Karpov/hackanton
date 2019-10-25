import {getState, updateState} from "../store/store";
import {DEL_APP_USER} from "../store/types";

export const delMsg = async ({bot, app, user, message}: any) => {
    const state = getState();
    const userIn = state.users[Number(user)];
    if (!userIn) {
        await bot.sendText(
            message.peer,
            `Такого пользователя нет в таблице ролей`
        );
        return null;
    }
    if (!userIn.apps.includes(app)) {
        await bot.sendText(
            message.peer,
            `Приложения ${app} нет у пользователя, я не могу удалять, чего нет`
        );
        return null;
    }
    const payload = {
        senderUserId: user,
        app: app
    };
    updateState({actionType: DEL_APP_USER, payload});
    await bot.sendText(
        message.peer,
        `Для пользователя ${user} удалено приложение ${app}`
    );
    return null;
};
