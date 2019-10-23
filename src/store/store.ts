/**
 * Вольная реализация хранилища. Чтобы redis не поднимать )))
 * */
import * as types from './types';


interface dataType  {
    context: { [key: number]: string },
    users: string,
    peer: any,
    job: any
}
interface Interface {
    actionType: string,
    payload: any
}

let data:dataType = {
    context: {},
    users: '',
    peer: {},
    job: {}
};

function getState():dataType {
    return {...data};
}

function updateState({actionType, payload}: Interface) {
    switch (actionType) {
        case types.USER_CONNECT: {
            data = {
                ...data,
                users: payload,
            };
            break;
        }
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
        users: '',
        peer: {},
        job: {},
    };
}

export {clearState, updateState, getState}
