import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {getAnswer, sleep} from "../utils";
import {jenkinsBuild, jenkinsGet, jenkinsInfo, jenkinsStream} from "../jenkinsManage/jenkinsManage";
import {getState, updateState} from "../store/store";
import {JOB_NUM} from "../store/types";
import {InterfaceBot} from "../model/interface";

export const messageOne = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'id_1.id_1_1',
                widget: Button.create({label: 'jenkins build'})
            }),
            Action.create({
                id: 'id_1.id_1_2',
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
    console.log('##resultJob:', resultJob);
    const normalizeNumber = Number(resultJob) / 2;
    await bot.sendText(
        peer,
        `Запущена job, номер билда: ${normalizeNumber}`
    );
    const payload = {
        senderUserId: peer.id,
        job: normalizeNumber,
    };
    updateState({actionType: JOB_NUM, payload});

    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: 'id_1.id_1_1.id_stream',
                widget: Button.create({label: 'Слушать логи Pipline'})
            })
        ]
    }))
};

export const mesJenkinsStream = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    const state = getState();
    const job = state.job[peer.id];
    if (!job) {
        await bot.sendText(
            peer,
            `Что-то пошло не так, job number: ${job}`
        );
        return null;
    }
    await sleep(5000);
    await bot.sendText(
        peer,
        `Ещё чучуть`
    );
    await sleep(6000);
    await bot.sendText(
        peer,
        `Ну вот я вернулся, 3 секунды и всё будет`
    );
    await sleep(3000);
    try {
        await jenkinsStream({name: 'TestPipe', n: job, bot, peer});
    } catch (e) {
        await bot.sendText(
            peer,
            `Возможно build ещё не вставл в очередь, попробуйте ещё раз чуть позже`
        )
    }

};

export const mesGetJob = async ({bot, peer}: InterfaceBot) => {
    console.log('++mesBack peer:', peer)
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    const result = await jenkinsGet('TestPipe');
    console.log('++resutl:', result)
    await bot.sendText(
        peer,
        String(result)
    );
    await bot.sendText(
        peer,
        `конец собщения`
    );
};



