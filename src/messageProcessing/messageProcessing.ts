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
import {ADD_APP_USER, DEL_APP_USER, PREV_PEER} from "../store/types";
import {demoScopeBot} from "./demoScopeBot";
import {unionJenkins} from "./unionJenkins";
import {graphTree} from "../graph/graph";
import {goGraph} from "../utils/graphUtils";
import {getAnswer} from "../utils/awaitText";
import {delMsg} from "./delMsg";
import {addMsg} from "./addMsg";

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
        const msg = message.content.text.toLocaleLowerCase();
        /** демонстрация что может бот **/
        // const isSendScope = await demoScopeBot({message, bot});
        // if (isSendScope) {
        //     return null; // прекращаем это всё
        // }

        const arrMsgMenu = ['?', '/?', 'меню', '/меню'];
        if (arrMsgMenu.includes(msg)) {
            const graf = graphTree({bot, peer: message.peer});
            await graf.message();
            return null;
        }
        const arrMsgHelp = ['help', 'помощь'];
        if(arrMsgHelp.includes(msg)) {
            await bot.sendText(
                message.peer,
                `Для вызова контекстного меню используйте команды: '?', 'меню' или 'menu', 'app'`
            );
            return null;
        }
        const msgWords:Array<string> = message.content.text.split(' ');

        if(msgWords[0] === '/add') {
            const user:string = msgWords[1];
            const app:string = msgWords[2];
            await addMsg({bot, user, app, message});
            return null;
        }

        if (msgWords[0] === '/del') {
            const user:string = msgWords[1];
            const app:string = msgWords[2];
            await delMsg({bot, app, user, message});
            return null;
        }
        await bot.sendText(
            message.peer,
            `Для вызова контекстного меню используйте команды: '?', 'меню' или 'menu', 'app'`
        );

    }
};
