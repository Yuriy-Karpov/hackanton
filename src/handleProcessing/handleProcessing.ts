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


        /**
         * необходимо для реализации контекста если будем прикручивать что-то серьёзное с морфологией
         *
        // let handler;
        // if (!context) {
        //     handler = graf.children;
        // } else {
        //     const point = goGraph(graf, event.id);
        //     handler = point.children;
        // }
        // console.log('++handler', handler)
        // if (!handler) {
        //     console.log('### Perhaps this the end of the line, is missing child:', event.id);
        //     return null;
        // }
         // const newContext = context ? `${context}.${event.id}` : `${event.id}`;
         */


        /**
         * тк от нажатия кнопки мы получаем тольк id кнопки - передача параметра реализуем после символа #
         */
        const newContext = event.id.split('#');

        console.log('++newContext[0]', newContext[0])
        const pointForMessage = goGraph(graf, newContext[0]);

        console.log('++pointForMessage', pointForMessage);
        if (newContext[1]) {
            console.log('++newContext[1]', newContext[1])
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
