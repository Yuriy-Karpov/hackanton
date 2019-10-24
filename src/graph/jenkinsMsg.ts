import {buildWithProp} from "../utils/BuildWithPropUtil";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {jenkinsInfo, jenkinsBuild, jenkinsStream} from "../jenkinsManage/jenkinsManage";
import {getState, updateState} from "../store/store";
import {getAnswer, sleep} from "../utils";
import {InterfaceBot} from "../model/interface";
import {JOB_NUM} from "../store/types";

const jenkinsMenu = async ({bot, peer}: InterfaceBot, param: string) => {

    const state = getState();
    const app = state.appList[param];


    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: [
            Action.create({
                id: `app_menu.jenkinsMenu.build_job_id#${app.jobBuild}`,
                widget: Button.create({label: 'Собрать новую сборку'})
            }),
            Action.create({
                id: `app_menu.jenkinsMenu.build_job_id#${app.jobBuild}`,
                widget: Button.create({label: 'Не собрать'})
            })
        ]
    }))
};


const jenkinsJobsStatus = async ({bot, peer}: InterfaceBot) => {
    await bot.sendText(
        peer,
        `Какой именно сервер интересует?`
    );
    const info = await jenkinsInfo();

    console.log('++info:', JSON.stringify(info, null, 4));
    console.log('++++++++++++++++++++++++++');

    const actions = info.jobs.map((job: any) => {
        return Action.create({
            id: `jenkinsMenu.build_job_id#${job.name}`,
            widget: Button.create({label: job.name})
        });
    });
    console.log('++actions', actions);
    const statusJob: Array<string> = info.jobs.map((job: any) => {
        return `Имя job: ${job.name}, \n Статус job: ${job.color}`
    });

    await bot.sendText(
        peer,
        statusJob.join('\n')
    );

    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: actions
    }))
};


const build_job_id = async ({bot, peer}: InterfaceBot, jobName: string) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    console.log('++param', jobName);
    const resultJob = await jenkinsBuild(jobName);
    const normalizeNumber = Number(resultJob);
    await bot.sendText(
        peer,
        `Запущена установка, номер билда: ${normalizeNumber}`
    );
    const payload = {
        senderUserId: peer.id,
        job: normalizeNumber,
    };
    updateState({actionType: JOB_NUM, payload});

    const state = getState();
    const job = state.job[peer.id];
    if (!job) {
        await bot.sendText(
            peer,
            `Что-то пошло не так, job number: ${job}`
        );
        return null;
    }

    await sleep(2000);
    await bot.sendText(
        peer,
        `Ещё чучуть`
    );
    await sleep(1000);
    try {
        await jenkinsStream({name: jobName, n: 5, bot, peer});
    } catch (e) {
        await bot.sendText(
            peer,
            `Возможно build ещё не вставл в очередь, попробуйте ещё раз чуть позже`
        )
    }
};


/**
 * Узел Графа для Jenkins
 * @param interfaceBot
 */
export const jenkinsBuildConnect = (interfaceBot: InterfaceBot) => ({
    message: buildWithProp(jenkinsMenu, interfaceBot),
    children: {
        build_job_id: {
            message: buildWithProp(build_job_id, interfaceBot)
        },
    }
});
