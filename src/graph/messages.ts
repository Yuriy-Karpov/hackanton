import Bot, {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import Peer from "@dlghq/dialog-bot-sdk/src/entities/Peer";
import {getAnswer} from "../utils";
import {jenkinsBuild, jenkinsGet, jenkinsInfo, jenkinsStream} from "../jenkinsManage/jenkinsManage";
import {updateState} from "../store/store";
import {MESSAGE_CONTEXT} from "../store/types";

interface InterfaceBot {
    bot: Bot,
    peer: Peer
}

export const rootMessage = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'id_1',
                widget: Button.create({label: 'jenkins далее'})
            }),
            Action.create({
                id: 'id_2',
                widget: Button.create({label: 'jenkins info'})
            }),
        ]
    }))
};

export const messageOne = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'id_1_1',
                widget: Button.create({label: 'jenkins build'})
            }),
            Action.create({
                id: 'id_1_2',
                widget: Button.create({label: 'jenkins Get'})
            }),
        ]
    }))
};

export const messageJenkinsInfo = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    const resultJob = await jenkinsInfo();
    await bot.sendText(
        peer,
        JSON.stringify(resultJob, null, 4)
    );
};

export const mesJenkinsBuild = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    const resultJob = await jenkinsBuild('TestPipe');
    await bot.sendText(
        peer,
        `Запущена job: ${resultJob}`
    );
    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'id_stream',
                widget: Button.create({label: 'Слушать логи Pipline'})
            })
        ]
    }))
};

export const mesJenkinsStream = async ({bot, peer}: InterfaceBot) => {
    await jenkinsStream({name: 'TestPipe', n: 21, bot, peer});
    await bot.sendText(
        peer,
        `Jenkins Pipline закончился`
    )
};

export const mesGetJob = async ({bot, peer}: InterfaceBot) => {
    console.log('++mesBack peer:', peer)
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    const result = await jenkinsGet('TestPipe', 21);
    console.log('++resutl:', result)
    await bot.sendText(
        peer,
        String(result)
    );
    await bot.sendText(
        peer,
        `конец собщения`
    );
    // const payload = {
    //     senderUserId: event.uid,
    //     context: newContext
    // };
    // updateState({actionType: MESSAGE_CONTEXT, payload});
};
