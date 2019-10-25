import {getState, updateState} from "../store/store";
import {ADD_APP_USER} from "../store/types";

export const addMsg = async ({bot, user, app, message}: any) => {
    const state = getState();
    const userIn = state.users[Number(user)];

    if (!userIn) {
        await bot.sendText(
            message.peer,
            `Пользователя ${user} нет в таблице ролей`
        );
        return null;
    }
    const payload = {
        senderUserId: user,
        app: app
    };
    updateState({actionType: ADD_APP_USER, payload});
    await bot.sendText(
        message.peer,
        `Для пользователя ${user} добавленно приложение ${app}`
    );
};
