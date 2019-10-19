import {InterfaceProcessing} from "./messageProcessing";
import Bot, {
    MessageAttachment,
    ActionGroup,
    Action,
    Button,
    GroupType,
    ActionConfirm
} from '@dlghq/dialog-bot-sdk';


export const unionJenkins = async ({message, bot}: InterfaceProcessing) => {
    await bot.sendText(
        message.peer,
        '',
        null,
        ActionGroup.create({
            actions: [
                Action.create({
                    id: 'unit_jenkins',
                    widget: Button.create({label: 'работа с jenkins'}),
                }),
                Action.create({
                    id: 'unit_status',
                    widget: Button.create({label: 'статус серверов'}),
                }),
                Action.create({
                    id: 'unit_wiki',
                    widget: Button.create({label: 'wiki'}),
                }),
            ],
        }),
    );
}
