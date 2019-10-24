import path from "path";
import Bot, {
    MessageAttachment,
    ActionGroup,
    Action,
    Button,
    GroupType,
    ActionConfirm
} from '@dlghq/dialog-bot-sdk';
import {InterfaceProcessing} from "./messageProcessing";
import Message from "@dlghq/dialog-bot-sdk/lib/entities/messaging/Message";
import {jenkinsInfo} from "../jenkinsManage/jenkinsManage";

export interface InterfaceDemoScopeBot extends InterfaceProcessing {
    message: Message,
    bot: Bot,
    author?: any
}

export const demoScopeBot = async ({message, bot}: InterfaceDemoScopeBot): Promise<boolean> => {
    if (message.content.type !== 'text') {
        return false;
    }
    switch (message.content.text.toLocaleLowerCase()) {

        /** это демо того, что умеет бот **/
        case 'кот':
        case 'картинку':
        case 'octocat':
            await bot.sendImage(
                message.peer,
                path.join('./external/', 'Sentrytocat.jpg'),
                MessageAttachment.forward(message.id),
            );
            return true;

        case 'document':
            // reply to self sent message with document
            await bot.sendDocument(
                message.peer,
                __filename,
                MessageAttachment.reply(message.id),
            );
            return true;

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

            return true;

        case 'delete':
            if (message.attachment) {
                await Promise.all(
                    message.attachment.mids.map((mid) => bot.deleteMessage(mid)),
                );
            }
            return true;

        case 'инфо': {
            const resultJob = await jenkinsInfo();
            await bot.sendText(
                message.peer,
                JSON.stringify(resultJob, null, 4)
            );
            return true;
        }

        case 'кнопки':
        case 'тест':
        case 'test':
            console.log('++message.peer,', message.peer,)
            // echo message with reply
            await bot.sendText(
                message.peer,
                message.content.text,
                MessageAttachment.reply(message.id),
                ActionGroup.create({
                    actions: [
                        Action.create({
                            id: 'jenkins_info',
                            widget: Button.create({label: 'jenkins info'}),
                        }),
                        Action.create({
                            id: 'test_no',
                            widget: Button.create({label: 'Нет'}),
                        }),
                        Action.create({
                            id: 'jenkins_info',
                            widget: Button.create({label: 'Перезагрузить'}),
                            confirm: ActionConfirm.create({
                                title: 'Перезагрузить',
                                text: 'Точно?',
                                ok: 'ok',
                                dismiss: 'отмена'
                            })
                        })
                    ],
                }),
            );
            return true;

        default: {
            return false;
        }
    }

};
