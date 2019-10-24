import SSH = require("ssh2-promise");


export class SshConnenction {
    private ssh: SSH;

    constructor(host: string, username: string, password: string) {
        const sshConfig = {host, username, password};
        this.ssh = new SSH(sshConfig);
    }

    async getUptime() {
        return await this.ssh.exec("uptime")
    };

    async getProcessesList() {
        return await this.ssh.exec("ps -aux")
    };

    async getRamUsage() {
        return await this.ssh.exec("free -h")
    };

    async getProcessorUsage() {
        return await this.ssh.exec("top -bn2 | grep \"Cpu(s)\" | \\\n" +
            "           sed \"s/.*, *\\([0-9.]*\\)%* id.*/\\1/\" | \\\n" +
            "           awk '{print 100 - $1\"%\"}'")
    };

    async getHardDriveStat() {
        return await this.ssh.exec("df -h")
    };
}