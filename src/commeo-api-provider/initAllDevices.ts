import { CommeoShutter } from "./CommeoShutter.js";
import { getStates } from "./get-states.js"

export const initAllDevices = async () => {
    console.info("Initializing all Selve Commeo devices...");
    const states: any[] = await getStates();

    const CMdevices: any[] = states.filter((val: any) => {return val.type == "CM"});

    const commeoShuttersPromise: Promise<CommeoShutter>[] = CMdevices.map(async (device: any) => {
        const shutter = new CommeoShutter(device.sid, device.adr);
        shutter.currentPos = device.state.position;
        await shutter.updateName();
        return shutter;
    });

    const commeoShutters: CommeoShutter[] = await Promise.all(commeoShuttersPromise);

    console.info(`Got ${commeoShutters.length} devices.`)

    return commeoShutters;
}