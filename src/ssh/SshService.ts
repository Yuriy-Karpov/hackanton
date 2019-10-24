import SSH = require("ssh2-promise");


export const getServerInfo = () => {

    //FIXME find new info!!!
    const host = '';
    const username = '';
    const password = '';

    const sshConnection = new SshConnection(host, username, password);

    const uptimePromise: Promise<String> = sshConnection.getUptime();
    const uptimePromise: Promise<String> = sshConnection.getUptime();
    const uptimePromise: Promise<String> = sshConnection.getUptime();

    Promise.all<String,void>([
        ,

    ]);


};

class SshConnection {
    private ssh: SSH;

    constructor(host: string, username: string, password: string) {
        const sshConfig = {host, username, password};
        this.ssh = new SSH(sshConfig);
    }

    getUptime(): Promise<String> {
        return this.ssh.exec("uptime")
    };

    getProcessesList(): Promise<String> {
        return this.ssh.exec("ps -aux")
    };

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