import {getState, updateState} from "../store/store";
import {MESSAGE_CONTEXT, PREV_PEER} from "../store/types";
import Bot, {Action, ActionEvent, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {jenkinsBuild, jenkinsGet, jenkinsInfo, jenkinsStream} from "../jenkinsManage/jenkinsManage";
import {graphTree} from "../graph/graph";
import {getAnswer, goGraph} from "../utils";

interface Interface {
    event: ActionEvent,
    bot: Bot
}

export const handleProcessing = async ({event, bot}: Interface) => {
    const state = getState();
    const peer = state.peer[event.uid];
    try {

        const context = state.context[event.uid];
        if (!peer) {
            return null;
        }

        const graf = graphTree({bot, peer});

        const newContext = event.id.split('#');

        const pointForMessage = goGraph(graf, newContext[0]);

        if (newContext[1]) {
            await pointForMessage.message(newContext[1]);
        } else {
            await pointForMessage.message();
        }


        const payload = {
            senderUserId: event.uid,
            context: newContext
        };
        updateState({actionType: MESSAGE_CONTEXT, payload});
    } catch (e) {
        console.log('ERROR:', e);
        await bot.sendText(
            peer,
            `Что-то пошло не так, попробуйте ещё раз`
        );
        return null;
    }
};
