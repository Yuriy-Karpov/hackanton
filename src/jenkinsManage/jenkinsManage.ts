import Jenkins from 'jenkins';

// @ts-ignore
const jenkins = new Jenkins(
    {
        baseUrl: 'http://HackAdmin:Hackaton2019@159.69.7.170:8080',
        crumbIssuer: true,
        // headers: {
        //     Authorization: '1102cc46866598cb3d066949f51aaa5215'
        // }
        promisify: true
    }
);



export const jenkinsInfo = () => {
    return jenkins.info();
};

export const jenkinsBuild = (name: string, param?:string) => {
    return jenkins.job.build({name, parameters: {data: param || 'Demo'}});
};

export const jenkinsGet = (name: string) => {

    return jenkins.build.log(name);

};


export const jenkinsStream = async ({name, n, bot, peer}: any) => {
    return new Promise((resolve, reject) => {
        console.log('++NUMBER_BUILD:', n);
        const log = jenkins.build.logStream(name, n, 'text');
        console.log('++log', log);
        log.on('data', (text: any) => {
            bot.sendText(
                peer,
                text
            );
        });

        log.on('error', (err: any) => {
            reject(err);
        });

        log.on('end',  () =>{
            bot.sendText(
                peer,
                `Jenkins Pipline закончился`
            );
            resolve('end')
        });
    });

};
