
import Bot from '@dlghq/dialog-bot-sdk';
import { flatMap } from 'rxjs/operators';
import { combineLatest, merge } from 'rxjs';
import {messageProcessing} from "../messageProcessing/messageProcessing";
import {handleProcessing} from "../handleProcessing/handleProcessing";



export const Run = async (token: string, endpoint: string) => {
    const bot = new Bot({
        token,
        endpoints: [endpoint],
        loggerOptions: {
            // name: 'example-bot',
            // level: 'trace',
            // prettyPrint: true,
        },
    });

    const self = await bot.getSelf();
    bot.logger.info(`I've started, post me something @${self.nick}`);

    /**
     * Тут подписываемся на любое обновление
     */
    bot.updateSubject.subscribe({
        next(update) {
            /** дебаг система **/
            // bot.logger.info(JSON.stringify({ update }, null, 2));
            // console.log('update', JSON.stringify({ update }, null, 2));
        },
    });

    /**
     * Тут обработка сообщений
     */
    const messagesHandle = bot.subscribeToMessages().pipe(
        flatMap(async (message) => {
            const author = await bot.forceGetUser(message.senderUserId);
            if (author.isBot) {
                // ignore other bots
                return;
            }
            console.log('++message:', JSON.stringify(message, null, 4));
            await messageProcessing({message, bot, author})
        }),
    );

    /**
     * Тут обработка эвентов (кнопок)
     **/
    const actionsHandle = bot
        .subscribeToActions()
        .pipe(
            flatMap(async (event) => {
                console.log('event:', JSON.stringify(event, null, 2));
                await handleProcessing({event, bot});
            }),

            /** для сложной отладки **/
            // flatMap(async (event) => bot.logger.info(JSON.stringify(event, null, 2))),
        );

    await new Promise((resolve, reject) => {
        merge(messagesHandle, actionsHandle).subscribe({
            error: reject,
            complete: resolve,
        });
    });
};

