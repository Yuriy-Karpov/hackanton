
export const AIST = 'AIST';
export const COMPASS = 'COMPASS';
export const ISERVE = 'ISERVE';
export const ONE_SERVER = '159.69.7.170';
export const TWO_SERVER = '78.47.57.207';

export const appList = {
    [AIST]: {
        jobBuild: 'simple_back_push_hook',
        servers: [ONE_SERVER, TWO_SERVER]
    },
    [COMPASS]: {
        jobBuild: 'simple_front_push_hook',
        servers: [ONE_SERVER, TWO_SERVER]
    },
    [ISERVE]: {
        jobBuild: 'images',
        servers: [ONE_SERVER, TWO_SERVER]
    }
};

export const serverList = {
    [ONE_SERVER]: {
        jobRestart: 'images',
        jobClean: 'first_clean',
    },
    [TWO_SERVER]: {
        jobRestart: 'second_restart',
        jobClean: 'second_clean',
    }
};
