import {getState, updateState} from "../store/store";
import {MESSAGE_CONTEXT, PREV_PEER, USER_CONNECT} from "../store/types";
import Bot, {Action, ActionEvent, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {jenkinsBuild, jenkinsGet, jenkinsInfo, jenkinsStream} from "../jenkinsManage/jenkinsManage";
import {graphTree} from "../graph/graph";
import {goGraph} from "../utils";

interface Interface {
    event: ActionEvent,
    bot: Bot
}

export const handleProcessing = async ({event, bot}: Interface) => {

    updateState({actionType: USER_CONNECT, payload: event.uid});

    const state = getState();
    const peer = state.peer[event.uid];
    const context = state.context[event.uid];
    if (!peer) {
        return null;
    }

    const graf = graphTree({bot, peer});

    let handler;
    if (!context) {
        handler = graf.children;
    } else {
        const point = goGraph(graf, context);
        handler = point.children;
    }

    if (!handler[event.id]) {
        console.log('### Perhaps this the end of the line, is missing child:', event.id);
        return null;
    }

    const newContext = context ? `${context}.${event.id}` : `${event.id}`;

    console.log('++newContext', newContext);
    const pointForMessage = goGraph(graf, newContext);

    await pointForMessage.message();

    const payload = {
        senderUserId: event.uid,
        context: newContext
    };
    updateState({actionType: MESSAGE_CONTEXT, payload});
};
