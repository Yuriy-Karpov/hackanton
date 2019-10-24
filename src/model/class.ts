export class ServerData {
    uptime: String;
    ram: String;
    cpu: String;
    hdd: String;

    constructor(uptime: String, ramPromise: String, procPromise: String, hardPromise: String) {
        this.uptime = uptime;
        this.ram = ramPromise;
        this.cpu = procPromise;
        this.hdd = hardPromise;
    }
}

export class ServerConfig {
    host:String;
    user:String;
    password:String;

    constructor(host: String, user: String, password: String) {
        this.host = host;
        this.user = user;
        this.password = password;
    }
}
