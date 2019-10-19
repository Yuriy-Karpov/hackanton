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
