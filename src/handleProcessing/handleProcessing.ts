import {getState, updateState} from "../store/store";
import {USER_CONNECT} from "../store/types";
import Bot, {ActionEvent} from "@dlghq/dialog-bot-sdk/lib";

interface Interface {
    event: ActionEvent,
    bot: Bot
}
export const handleProcessing = async ({event, bot}: Interface) => {

    updateState({actionType: USER_CONNECT, payload: event.uid});
    const state = getState();
    const peer = state.peer[event.uid];
    if (!peer) {
        return null;
    }
    switch (event.id) {
        case 'test_yes': {
            await bot.sendText(
                peer,
                'чувааак'
            );
            break;
        }
        default: {
            return null;
        }
    }
};
