import { sendRequest } from "./commeo-api-provider.js"
import { RequestMethod } from "./RequestMethod.js"

export const getDeviceConfiguration = (adr: string) => {
    return sendRequest(RequestMethod.GET, `/cmd?XC_FNC=GetConfig&type=CM&adr=${adr}`);
}