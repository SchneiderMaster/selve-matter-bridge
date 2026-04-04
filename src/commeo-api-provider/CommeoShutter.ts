import { getDeviceConfiguration } from "./get-device-configuration.js";
import { moveDown } from "./move-down.js";
import { moveTo } from "./move-to.js";
import { moveUp } from "./move-up.js";
import { stop } from "./stop.js";

export class CommeoShutter {
    
    public sid: string | undefined;
    private adr: string | undefined;

    public name: string | undefined;
    public currentPos: number | undefined;
    public targetPos: number | undefined;

    public constructor (sid: string, adr: string) {
        this.sid = sid;
        this.adr = adr;
    }

    private getConfig = async () => {
        if(!this.adr){
            throw new Error("ADR of device undefined");
        }

        return await getDeviceConfiguration(this.adr);
    }

    public updateName = async () => {
        return this.getConfig().then((res) => {

        if(!res.info.configurable.name) {
            throw new Error("Name of device not found");
        }

        this.name = res.info.configurable.name;
    });
    }

    public moveUp = () => {
        if(!this.sid){
            throw new Error("SID of device undefined");
        }

        moveUp(this.sid);
    }

    public moveDown = () => {
        if(!this.sid){
            throw new Error("SID of device undefined");
        }

        moveDown(this.sid);
    }

    public stop = () => {
        if(!this.sid){
            throw new Error("SID of device undefined");
        }

        stop(this.sid);
    }

    public moveTo = (targetPos: number) => {
        if(!this.sid){
            throw new Error("SID of device undefined");
        }

        moveTo(this.sid, targetPos);
    }
}