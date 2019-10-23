
type Obj = { [key: string]: any };

export function _get(obj: Obj, str: string, def?:any):any {
    const paramArr:string[] = str.split('.');
    let obj2 = obj;
    for (let i:number = 0; i < paramArr.length; i++) {
        if (obj2[paramArr[i]]) {
            obj2 = obj2[paramArr[i]]
        } else {
            return def !== undefined
                ? def
                : undefined
        }
    }
    return obj2
}
