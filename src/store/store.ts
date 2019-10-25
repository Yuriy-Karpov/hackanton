/**
 * Вольная реализация хранилища. Чтобы redis не поднимать )))
 * */
import * as types from './types';
import {role} from "./role";
import {appList, serverList} from "./appList";
import {dataType, Interface} from "./interface";
import {DEL_APP_USER} from "./types";


let data: dataType = {
    context: {},
    users: role,
    peer: {},
    job: {},
    appList,
    serverList,
};

function getState(): dataType {
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
        case types.ADD_APP_USER: {
            data = {
                ...data,
                users: {
                    ...data.users,
                    [payload.senderUserId]: {
                        ...data.users[payload.senderUserId],
                        apps: [
                            ...data.users[payload.senderUserId].apps,
                            payload.app
                        ]
                    },
                }
            };
            break;
        }
        case types.DEL_APP_USER: {
            const newApp: Array<string> = data.users[payload.senderUserId].apps.filter(item => {
                if (item !== payload.app) {
                    return true;
                }
            });
            data = {
                ...data,
                users: {
                    ...data.users,
                    [payload.senderUserId]: {
                        ...data.users[payload.senderUserId],
                        apps: newApp
                    },
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
        appList: {},
        serverList: {}
    };
}

export {clearState, updateState, getState}
