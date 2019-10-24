export interface dataType {
    context: { [key: number]: string },
    users: { [key: number]: UserItem },
    peer: any,
    job: any,
    appList: { [key: string]: AppItem },
    serverList: { [key: string]: ServerItem },
}

export interface AppItem {
    jobBuild: string,
    servers: Array<string>
}
export interface ServerItem {
    jobRestart: string,
    jobClean: string,
}

export interface UserItem {
    name: string,
    admin: boolean,
    apps: Array<string>
}

export interface Interface {
    actionType: string,
    payload: any
}

