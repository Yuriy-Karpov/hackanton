import {getState, updateState} from "../store/store";
import {MESSAGE_CONTEXT, PREV_PEER, USER_CONNECT} from "../store/types";
import Bot, {Action, ActionEvent, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {jenkinsInfo} from "../jenkinsManage/jenkinsManage";

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
        case 'unit_jenkins': {

            const payload = {
                senderUserId: event.uid,
                context: 'unit_jenkins'
            };
            updateState({actionType: MESSAGE_CONTEXT, payload});

            await bot.sendText(
                peer,
                '',
                null,
                ActionGroup.create({
                    actions: [
                        Action.create({
                            id: 'jenkins_info',
                            widget: Button.create({label: 'jenkins info'}),
                        }),
                        Action.create({
                            id: 'unit_status',
                            widget: Button.create({label: 'jenkins build'}),
                        }),
                        Action.create({
                            id: 'back',
                            widget: Button.create({label: 'назад'}),
                        }),
                    ],
                }),
            );
            break;
        }
        case 'jenkins_info': {
            const resultJob = await jenkinsInfo();
            await bot.sendText(
                peer,
                JSON.stringify(resultJob, null, 4)
            );
            const payload = {
                senderUserId: event.uid,
                context: ''
            };
            updateState({actionType: MESSAGE_CONTEXT, payload});
            break;
        }
        case 'back': {
            const payload = {
                senderUserId: event.uid,
                context: ''
            };
            updateState({actionType: MESSAGE_CONTEXT, payload});
            break;
        }
        default: {
            return null;
        }
    }
};
