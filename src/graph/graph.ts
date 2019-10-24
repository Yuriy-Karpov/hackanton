import {mesGetJob, mesJenkinsBuild, mesJenkinsStream, messageJenkinsInfo, messageOne} from "./messages";
import {sshMenuAndHandler} from './sshMessages'
import {buildWithProp} from "./util";
import {InterfaceBot} from "./interface";
import {jenkinsBuildConnect} from "./jenkinsMsg";
import {appMenuHandler, rootMessage} from "./rootPoint";


export function graphTree({bot, peer}: InterfaceBot) {
    return {
        message: buildWithProp(rootMessage, {bot, peer}),
        children: {
           app_menu: {
               message: buildWithProp(appMenuHandler, {bot, peer}),
               children: {
                   id_1: {
                       message: buildWithProp(messageOne, {bot, peer}),
                       children: {
                           id_1_1: {
                               message: buildWithProp(mesJenkinsBuild, {bot, peer}),
                               children: {
                                   id_stream: {
                                       message: buildWithProp(mesJenkinsStream, {bot, peer})
                                   }
                               }
                           },
                           id_1_2: {
                               message: buildWithProp(mesGetJob, {bot, peer})
                           },
                       }
                   },
                   id_2: {
                       message: buildWithProp(messageJenkinsInfo, {bot, peer})
                       // message: buildWithProp(mesGetJob, {bot, peer})
                   },
                   jenkinsMenu: jenkinsBuildConnect({bot, peer}),
                   shhMenu: sshMenuAndHandler({bot,peer})
               }
           }
        },
    }
}

