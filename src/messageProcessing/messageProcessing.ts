import Bot, {
    MessageAttachment,
    ActionGroup,
    Action,
    Button,
    GroupType,
    ActionConfirm
} from '@dlghq/dialog-bot-sdk';
import Message from "@dlghq/dialog-bot-sdk/lib/entities/messaging/Message";
import {getState, updateState} from "../store/store";
import {PREV_PEER} from "../store/types";
import {demoScopeBot} from "./demoScopeBot";
import {unionJenkins} from "./unionJenkins";
import {graphTree} from "../graph/graph";
import {goGraph} from "../utils/graphUtils";
import {getAnswer} from "../utils/awaitText";

export interface InterfaceProcessing {
    message: Message,
    bot: Bot,
    author?: any
}

export const messageProcessing = async ({message, bot}: InterfaceProcessing) => {
    console.log('++content.type:', message.content.type);
    if (message.content.type === 'text') {


        const payload = {
            senderUserId: message.senderUserId,
            peer: message.peer
        };
        updateState({actionType: PREV_PEER, payload});

        const state = getState();
        console.log('STATE:', JSON.stringify(state, null, 2));

        const contextMess = state.context[message.senderUserId];

        /** демонстрация что может бот **/
        const isSendScope = await demoScopeBot({message, bot});

        if (isSendScope) {
            return null; // прекращаем это всё
        }

        await bot.sendText(
            message.peer,
            'Если нужна помощь пишите /help или /помощь или используй подсказки бота'
        );
        const graf = graphTree({bot, peer: message.peer});
        await graf.message();
        if (contextMess === 'unit_jenkins') {
            // код для обработки собщений в контексте jenkins
        }
        if (contextMess === 'wiki') {
            // код для обработки собщений в контексте wiki
        }

    }
};
