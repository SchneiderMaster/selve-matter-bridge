import { CommeoShutter } from "./CommeoShutter.js";
import { getStates } from "./get-states.js"

export const initAllDevices = async () => {
    const states: any[] = await getStates();

    const CMdevices: any[] = states.filter((val: any) => {return val.type == "CM"});

    const commeoShuttersPromise: Promise<CommeoShutter>[] = CMdevices.map(async (device: any) => {
        const shutter = new CommeoShutter(device.sid, device.adr);
        await shutter.updateName();
        return shutter;
    });

    const commeoShutters: CommeoShutter[] = await Promise.all(commeoShuttersPromise);

    return commeoShutters;
}