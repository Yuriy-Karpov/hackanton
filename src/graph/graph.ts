import {sshMenuServer} from './sshMessages'
import {jenkinsBuildConnect} from "./jenkinsMsg";
import {adminAddHandler, adminDelHandler, adminMenuHandler, appMenuHandler, rootMessage} from "./rootPoint";
import {InterfaceBot} from "../model/interface";
import {buildWithProp} from "../utils/BuildWithPropUtil";


export function graphTree({bot, peer}: InterfaceBot) {
    return {
        message: buildWithProp(rootMessage, {bot, peer}),
        children: {
            app_menu: {
                message: buildWithProp(appMenuHandler, {bot, peer}),
                children: {
                    jenkinsMenu: jenkinsBuildConnect({bot, peer}),
                    shhMenu: sshMenuServer({bot, peer})
                }
            },
            admin_menu: {
                message: buildWithProp(adminMenuHandler, {bot, peer}),
                children: {
                    add: {
                        message: buildWithProp(adminAddHandler, {bot, peer})
                    },
                    del: {
                        message:  buildWithProp(adminDelHandler, {bot, peer})
                    },
                }
            }
        },
    }
}

