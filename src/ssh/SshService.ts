import SSH = require("ssh2-promise");
import {ServerConfig, ServerData} from "../model/class";
import {getRandomPercentString} from "../utils/RandomUtil";

const exampleServerConfig = new ServerConfig('', '', '');
const getConfig = (serverName: string): ServerConfig => exampleServerConfig;

const getRealServerInfo = async (serverName: string): Promise<ServerData> => {
    const serverConfig: ServerConfig = getConfig(serverName);
    const sshConnection = new SshConnection(serverConfig.host, serverConfig.user, serverConfig.password);

    const uptimePromise: Promise<String> = sshConnection.getUptime();
    const ramPromise: Promise<String> = sshConnection.getRamUsage();
    const procPromise: Promise<String> = sshConnection.getProcessorUsage();
    const hardPromise: Promise<String> = sshConnection.getHardDriveStat();

    const promises: Promise<String>[] = [
        uptimePromise,
        ramPromise,
        procPromise,
        hardPromise
    ];

    return await Promise.all(promises).then(values => new ServerData(values[0], values[1], values[2], values[3]));
};

const getMockServerInfo = async (serverName: string): Promise<ServerData> =>
    new Promise<ServerData>(resolve => resolve(
        new ServerData(
            Date.now().toString(),
            getRandomPercentString(),
            getRandomPercentString(),
            getRandomPercentString()
        )
    ));

const clearTmpReal = (serverName: string): Promise<void> => new Promise<void>((resolve, reject) => reject());
const clearTmpMock = (serverName: string): Promise<void> => new Promise<void>((resolve, reject) => resolve());

const restartRealServer = (serverName: string): Promise<void> => new Promise<void>((resolve, reject) => reject());
const restartMockServer = (serverName: string): Promise<void> => new Promise<void>((resolve, reject) => resolve());

//TODO add sim
const isMockOn = true;

export const serverRestart = (serverName: string): Promise<void> =>
    isMockOn ?
        restartMockServer(serverName) :
        restartRealServer(serverName);

export const clearTmp = (serverName: string): Promise<void> =>
    isMockOn ?
        clearTmpMock(serverName) :
        clearTmpReal(serverName);


export const getServerInfo = (serverName: string): Promise<ServerData> =>
    isMockOn ?
        getMockServerInfo(serverName) :
        getRealServerInfo(serverName);

class SshConnection {
    private ssh: SSH;

    constructor(host: String, username: String, password: String) {
        const sshConfig = {host, username, password};
        this.ssh = new SSH(sshConfig);
    }

    getUptime(): Promise<String> {
        return this.ssh.exec("uptime")
    };

    getProcessesList(): Promise<String> {
        return this.ssh.exec("ps -aux")
    };

    getDockerList(): Promise<String> {
        return this.ssh.exec("docker container ls -a")
    }

    getRamUsage(): Promise<String> {
        return this.ssh.exec("free -h")
    };

    getProcessorUsage(): Promise<String> {
        return this.ssh.exec("top -bn2 | grep \"Cpu(s)\" | \\\n" +
            "           sed \"s/.*, *\\([0-9.]*\\)%* id.*/\\1/\" | \\\n" +
            "           awk '{print 100 - $1\"%\"}'")
    };

    getHardDriveStat(): Promise<String> {
        return this.ssh.exec("df -h")
    };
}