
export const HUXLEY = 'HUXLEY';
export const ZAMYATIN = 'ZAMYATIN';
export const ORWELL = 'ORWELL';
export const ONE_SERVER = '159.69.7.170';
export const TWO_SERVER = '78.47.57.207';

export const appList = {
    [HUXLEY]: {
        jobBuild: 'first_deploy',
        servers: [ONE_SERVER, TWO_SERVER]
    },
    [ZAMYATIN]: {
        jobBuild: 'second_deploy',
        servers: [ONE_SERVER, TWO_SERVER]
    },
    [ORWELL]: {
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
