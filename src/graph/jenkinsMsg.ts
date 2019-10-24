import {buildWithProp} from "../utils/BuildWithPropUtil";
import {Action, ActionGroup, Button} from "@dlghq/dialog-bot-sdk/lib";
import {jenkinsInfo} from "../jenkinsManage/jenkinsManage";
import {getState} from "../store/store";
import {getAnswer} from "../utils";
import {InterfaceBot} from "../model/interface";

const jenkinsMenu = async ({bot, peer}: InterfaceBot, param: string) => {
    await bot.sendText(
        peer,
        `Какой именно сервер интересует?`
    );

    const state = getState();
    const userProps = state.users[peer.id];

    const actions = userProps.apps.map((name: string) => {
        return Action.create({
            id: `jenkinsMenu.build_job_id#${name}`,
            widget: Button.create({label: name})
        });
    });

    await bot.sendText(peer, '', null, ActionGroup.create({
        actions: actions
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


const build_job_id = async ({bot, peer}: InterfaceBot, param: string) => {
    await bot.sendText(
        peer,
        `${getAnswer()}`
    );
    // const resultJob = await jenkinsBuild('TestPipe');
    // console.log('##resultJob:', resultJob);
    // const normalizeNumber = Number(resultJob) / 2;
    // await bot.sendText(
    //     peer,
    //     `Запущена установка ${param}, номер билда: ${normalizeNumber}`
    // );

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
