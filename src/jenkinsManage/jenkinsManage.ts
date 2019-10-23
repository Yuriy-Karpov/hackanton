import Jenkins from 'jenkins';

// @ts-ignore
const jenkins = new Jenkins(({ baseUrl: 'http://HackAdmin:Hackaton2019@159.69.7.170:8080', crumbIssuer: true }));

/** выворачиваем колбэки в ппромисы **/

export const jenkinsInfo = () => {
    return new Promise((resolve, reject) => {
        jenkins.info((err: any, data: any) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

export const jenkinsBuild = (name:string) => {
    return new Promise((resolve, reject) => {
        jenkins.job.build({name, parameters: {data: 'Hello World'}}, (err: any, data: any) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

export const jenkinsGet = (name:string, n: number) => {
    return new Promise((resolve, reject) => {
        jenkins.build.log(name, n, (err: any, data: any) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
};



export const jenkinsStream = async ({name, n, bot, peer}: any) => {
    return new Promise((resolve, reject) => {
        const log = jenkins.build.logStream(name, n);

        log.on('data', (text: any) => {
             bot.sendText(
                peer,
                text
            );
        });

        log.on('error', function(err: any) {
            reject(err);
        });

        log.on('end', function() {
            console.log('++END!!!!!!!!!!!!!!')
            resolve('end')
        });
    });
};
