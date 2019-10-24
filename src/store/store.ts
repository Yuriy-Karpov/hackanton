/**
 * Вольная реализация хранилища. Чтобы redis не поднимать )))
 * */
import * as types from './types';
import {role} from "./role";
import {appList, serverList} from "./appList";
import {dataType, Interface} from "./interface";


let data:dataType = {
    context: {},
    users: role,
    peer: {},
    job: {},
    appList,
    serverList,
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
        appList: {},
        serverList: {}
    };
}

export {clearState, updateState, getState}
