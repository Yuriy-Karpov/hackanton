/**
 * Вольная реализация хранилища. Чтобы redis не поднимать )))
 * */
import * as types from './types';
import {role} from "./role";
import {appList} from "./appList";


interface dataType  {
    context: { [key: number]: string },
    users: { [key: number]: UserItem },
    peer: any,
    job: any,
    appList: {[key: string]: AppItem }
}
export interface AppItem {
    jobBuild: string,
    servers: Array<string>
}
export interface UserItem {
    name: string,
    admin: boolean,
    apps: Array<string>
}
interface Interface {
    actionType: string,
    payload: any
}

let data:dataType = {
    context: {},
    users: role,
    peer: {},
    job: {},
    appList
};

function getState():dataType {
    return {...data};
}

function updateState({actionType, payload}: Interface) {
    switch (actionType) {
        case types.MESSAGE_CONTEXT: {
            data = {
                ...data,
                context: {
                    ...data.context,
                    [payload.senderUserId]: payload.context,
                },
            };
            break;
        }
        case types.PREV_PEER: {
            data = {
                ...data,
                peer: {
                    ...data.peer,
                    [payload.senderUserId]: payload.peer,
                }

            };
            break;
        }
        case types.JOB_NUM: {
            data = {
                ...data,
                job: {
                    ...data.job,
                    [payload.senderUserId]: payload.job,
                }

            };
            break;
        }
        default: {
            break;
        }
    }
}

function clearState() {
    data = {
        context: {},
        users: {},
        peer: {},
        job: {},
        appList: {}
    };
}

export {clearState, updateState, getState}
