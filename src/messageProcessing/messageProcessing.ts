import path from "path";
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

interface InterfaceProcessing {
    message: Message,
    bot: Bot,
    author: any
}

export const messageProcessing = async ({message, bot}: InterfaceProcessing) => {
    if (message.content.type === 'text') {

        const state = getState();
        console.log('STATE:', JSON.stringify(state, null, 2));
        const payload = {
            senderUserId: message.senderUserId,
            peer: message.peer
        };
        updateState({actionType: PREV_PEER, payload});


        switch (message.content.text) {
            case 'octocat':
                await bot.sendImage(
                    message.peer,
                    path.join('./external/', 'Sentrytocat.jpg'),
                    MessageAttachment.forward(message.id),
                );
                break;

            case 'document':
                // reply to self sent message with document
                await bot.sendDocument(
                    message.peer,
                    __filename,
                    MessageAttachment.reply(message.id),
                );
                break;

            case 'group':
                const group = await bot.createGroup(
                    'Test Group',
                    GroupType.privateGroup(),
                );
                await bot.inviteGroupMember(
                    group,
                    await bot.forceGetUser(message.senderUserId),
                );
                const securityBot = await bot.findUserByNick('security');
                if (securityBot) {
                    await bot.inviteGroupMember(group, securityBot);
                    await bot.sendText(
                        group.getPeer(),
                        `@security I've invited you and I will kick you!`,
                    );
                    await bot.kickGroupMember(group, securityBot);
                }

                await bot.sendText(
                    group.getPeer(),
                    `Invite everyone to this group: ${await bot.fetchGroupInviteUrl(
                        group,
                    )}`,
                );

                break;

            case 'delete':
                if (message.attachment) {
                    await Promise.all(
                        message.attachment.mids.map((mid) => bot.deleteMessage(mid)),
                    );
                }
                break;

            default:
                console.log('++message.peer,', message.peer,)
                // echo message with reply
                await bot.sendText(
                    message.peer,
                    message.content.text,
                    MessageAttachment.reply(message.id),
                    ActionGroup.create({
                        actions: [
                            Action.create({
                                id: 'test_yes',
                                widget: Button.create({ label: 'да' }),
                            }),
                            Action.create({
                                id: 'test_no',
                                widget: Button.create({ label: 'Нет' }),
                            }),
                            Action.create({
                                id: 'test',
                                widget: Button.create({ label: 'Перезагрузить' }),
                                confirm: ActionConfirm.create({ title: 'Перезагрузить', text: 'Точно?', ok: 'ok', dismiss: 'отмена' })
                            })
                        ],
                    }),
                );
                break;
        }
    }
};
